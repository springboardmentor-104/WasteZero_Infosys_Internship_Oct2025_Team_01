const Message = require('../models/Message');
const Notification = require('../models/Notification');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, content, conversationId } = req.body;
    const msg = new Message({
      conversationId: conversationId || `${req.user._id}_${receiver}`,
      sender: req.user._id,
      receiver,
      content
    });
    await msg.save();

    // Save notification
    const note = new Notification({
      user: receiver,
      type: 'message',
      title: 'New message',
      body: `${req.user.name} sent you a message`,
      data: { messageId: msg._id, sender: req.user._id }
    });
    await note.save();

    // emit real-time via socket.io
    if (req.io) {
      req.io.emit('receive_message', {
        sender: req.user._id,
        receiver,
        content,
        messageId: msg._id,
        createdAt: msg.createdAt
      });
    }

    res.status(201).json(msg);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getConversation = async (req, res) => {
  try {
    const otherUserId = req.params.userId;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: otherUserId },
        { sender: otherUserId, receiver: req.user._id }
      ]
    }).sort('createdAt');
    res.json(messages);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getUserConversations = async (req, res) => {
  try {
    // return last message grouped by conversationId
    const lastMessages = await Message.aggregate([
      { $match: { $or: [ { sender: req.user._id }, { receiver: req.user._id } ] } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$conversationId",
          doc: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $sort: { createdAt: -1 } }
    ]);
    res.json(lastMessages);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
