import express from 'express';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// GET /users/me
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// PUT /users/update
router.put('/update', authenticate, async (req, res) => {
  try {
    const { name, skills, location, bio } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (skills) updateData.skills = skills;
    if (location) updateData.location = location;
    if (bio) updateData.bio = bio;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

export default router;
