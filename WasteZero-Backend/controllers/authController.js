import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const createAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m" });

const createRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d" });

const sendResetEmail = async (toEmail, resetUrl) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"WasteZero" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Password Reset - WasteZero",
    html: `<p>You requested a password reset. Click the link below to set a new password. This link expires in 15 minutes.</p>
           <p><a href="${resetUrl}">${resetUrl}</a></p>`,
  });
  return info;
};

export const register = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "Please provide username, email and password" });

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ message: "User with that email or username already exists" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, username, email, password: hashed, role });

    // optionally issue tokens on register:
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // store refresh token (hashed or as-is - here stored as-is with createdAt)
    user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    await user.save();

    res.status(201).json({
      message: "User registered",
      user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role },
      tokens: { accessToken, refreshToken }
    });
  } catch (err) {
    console.error(err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({ message: "Username or email already exists" });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) return res.status(400).json({ message: "Provide credentials" });

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    // optionally limit number of stored refresh tokens
    await user.save();

    res.json({
      message: "Logged in",
      user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role },
      tokens: { accessToken, refreshToken }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// exchange refresh token -> new access token
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

    // verify refresh token
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Refresh token invalid or expired" });
    }

    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    // check token exists in DB (so we can revoke)
    const stored = user.refreshTokens.find(rt => rt.token === refreshToken);
    if (!stored) return res.status(401).json({ message: "Refresh token revoked" });

    const newAccessToken = createAccessToken(user._id);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

    // remove refresh token from DB
    const payload = jwt.decode(refreshToken);
    if (!payload?.id) return res.status(400).json({ message: "Invalid token" });

    const user = await User.findById(payload.id);
    if (!user) return res.status(200).json({ message: "Already logged out" });

    user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
    await user.save();

    res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// forgot password: create reset token and email link
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Provide email" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user with that email" });

    // create token (random), store hashed version in DB for safety
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendResetEmail(user.email, resetUrl);

    res.json({ message: "Reset email sent if account exists" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// reset password using token (token from link is raw; in DB we have hashed)
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token) return res.status(400).json({ message: "No token provided" });
    if (!password) return res.status(400).json({ message: "New password required" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // optionally clear refresh tokens to force re-login everywhere
    user.refreshTokens = [];
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// change password while logged-in
export const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ message: "Provide current and new password" });

    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

    user.password = await bcrypt.hash(newPassword, 12);
    // optional: revoke refresh tokens
    user.refreshTokens = [];
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// get profile
export const getProfile = (req, res) => {
  const user = req.user;
  res.json({ user });
};
