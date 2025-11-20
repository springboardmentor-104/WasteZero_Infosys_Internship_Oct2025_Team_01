import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user","admin"], default: "user" },

  // refresh tokens array - store tokens for revocation if needed
  refreshTokens: [{ token: String, createdAt: Date }],

  // password reset
  resetPasswordToken: String, // hashed token
  resetPasswordExpire: Date
}, { timestamps: true });

export default mongoose.model("User", userSchema);
