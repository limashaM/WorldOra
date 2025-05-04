const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo'); 

dotenv.config();

const UserRouter = require('./Routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'limasha**2001', // You can put a strong secret in your .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, 
      collectionName: 'sessions', 
    }),
    cookie: {
      secure: false, // ✅ for local development
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

if (process.env.NODE_ENV !== 'test') {
  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection failed:', err.message);
      process.exit(1);
    }
  };
  connectDB();
}

// Use the routes for user-related operations
app.use('/api', UserRouter);

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}
