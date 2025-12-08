import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import opportunityRoutes from './routes/opportunity.js';
import applicationRoutes from './routes/application.js';
import messageRoutes from './routes/message.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'WasteZero Backend Running' });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/opportunity', opportunityRoutes);
app.use('/applications', applicationRoutes);
app.use('/messages', messageRoutes);
app.use('/admin', adminRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

export default app;

