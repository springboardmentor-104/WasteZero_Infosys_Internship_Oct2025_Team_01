import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Message from '../models/Message.js';

const router = express.Router();

// GET /messages/:userId
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id.toString();

    // Get messages between current user and the specified user
    const messages = await Message.find({
      $or: [
        { sender_id: currentUserId, receiver_id: userId },
        { sender_id: userId, receiver_id: currentUserId }
      ]
    })
      .populate('sender_id', 'name email')
      .populate('receiver_id', 'name email')
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

// POST /messages/send
router.post('/send', authenticate, async (req, res) => {
  try {
    const { receiver_id, content } = req.body;

    if (!receiver_id || !content) {
      return res.status(400).json({ message: 'Receiver ID and content are required' });
    }

    const message = new Message({
      sender_id: req.user._id,
      receiver_id,
      content,
      timestamp: new Date()
    });

    await message.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('sender_id', 'name email')
      .populate('receiver_id', 'name email');

    res.status(201).json({ message: 'Message sent successfully', data: populatedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
});

export default router;

