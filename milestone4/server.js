const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const savedRoutes = require('./routes/saved');
const notificationRoutes = require('./routes/notification');
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const opportunityRoutes = require("./routes/opportunity");
const authRoutes = require("./routes/auth");
const applicationRoutes = require('./routes/application');
const recommendationRoutes = require('./routes/recommendation');

connectDB(process.env.MONGO_URI);

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/applications', applicationRoutes);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/opportunities", opportunityRoutes);

// health check
app.get("/", (req, res) => res.send("WasteZero API running"));

// global fallback error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
