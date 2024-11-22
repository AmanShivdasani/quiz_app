// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('MongoDB connection error:', err);
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Routes
app.get('/api/quizzes', async (req, res) => {
  try {
    // Get 5 random quiz questions
    const quizzes = await Quiz.aggregate([
      { $sample: { size: 5 } }  // Randomly select 5 documents
    ]);
    res.json(quizzes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
