require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const opportunityRoutes = require('./routes/opportunities');
const applicationRoutes = require('./routes/applications');
const recommendationRoutes = require('./routes/recommendations');
const messageRoutes = require('./routes/messages');
const notificationRoutes = require('./routes/notifications');
const savedRoutes = require('./routes/saved');
const adminRoutes = require('./routes/admin');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // adjust for production
    methods: ['GET', 'POST']
  }
});

// Simple in-memory map of userId -> socketId(s)
const userSocketMap = new Map();

// Socket.io events
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('register', (userId) => {
    if (!userSocketMap.has(userId)) userSocketMap.set(userId, new Set());
    userSocketMap.get(userId).add(socket.id);
    console.log('User registered to socket:', userId, socket.id);
  });

  socket.on('send_message', (payload) => {
    // payload: { senderId, receiverId, content, conversationId }
    const { receiverId } = payload;
    // emit to receiver sockets
    const sockets = userSocketMap.get(receiverId);
    if (sockets) {
      for (const sid of sockets) {
        io.to(sid).emit('receive_message', payload);
      }
    }
  });

  socket.on('disconnect', () => {
    for (const [userId, set] of userSocketMap.entries()) {
      if (set.has(socket.id)) {
        set.delete(socket.id);
        if (set.size === 0) userSocketMap.delete(userId);
        break;
      }
    }
    console.log('Socket disconnected:', socket.id);
  });
});

// make io accessible in req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/admin', adminRoutes);

// Error handler
app.use(errorHandler);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
