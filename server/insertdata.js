// insertData.js
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB URI from .env file
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

// Define the Quiz Schema
const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Sample quiz data
const quizzes = [
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "H2"],
    correctAnswer: "H2O",
  },
  {
    question: "Which continent is known as the 'Dark Continent'?",
    options: ["Asia", "Africa", "Europe", "Australia"],
    correctAnswer: "Africa",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: "Vatican City",
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Gobi", "Kalahari", "Antarctic Desert"],
    correctAnswer: "Antarctic Desert",
  },
  {
    question: "Who was the first president of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correctAnswer: "George Washington",
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correctAnswer: "Nile River",
  },
  {
    question: "Which animal is known for its ability to change colors?",
    options: ["Chameleon", "Octopus", "Cuttlefish", "Squid"],
    correctAnswer: "Chameleon",
  },
  {
    question: "In which country was the game of chess invented?",
    options: ["India", "China", "Russia", "Iran"],
    correctAnswer: "India",
  },
  {
    question: "Which element is commonly used in lightbulbs?",
    options: ["Helium", "Neon", "Argon", "Oxygen"],
    correctAnswer: "Argon",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Diamond", "Platinum", "Iron"],
    correctAnswer: "Diamond",
  },
  {
    question: "Which country is home to the Great Barrier Reef?",
    options: ["Australia", "New Zealand", "Indonesia", "Philippines"],
    correctAnswer: "Australia",
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Nikola Tesla"],
    correctAnswer: "Albert Einstein",
  },
  {
    question: "What is the largest island in the world?",
    options: ["Australia", "Greenland", "New Guinea", "Borneo"],
    correctAnswer: "Greenland",
  },
  {
    question: "Which organ is responsible for pumping blood throughout the body?",
    options: ["Lungs", "Brain", "Heart", "Liver"],
    correctAnswer: "Heart",
  },
  {
    question: "What is the boiling point of water at sea level in Celsius?",
    options: ["90°C", "95°C", "100°C", "105°C"],
    correctAnswer: "100°C",
  },
  {
    question: "Which famous writer created the character Sherlock Holmes?",
    options: ["J.K. Rowling", "Arthur Conan Doyle", "Agatha Christie", "Edgar Allan Poe"],
    correctAnswer: "Arthur Conan Doyle",
  },
  {
    question: "Which of these is a primary color?",
    options: ["Orange", "Purple", "Blue", "Green"],
    correctAnswer: "Blue",
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Onion", "Avocado", "Cucumber"],
    correctAnswer: "Avocado",
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctAnswer: "Mercury",
  }
];

// Insert data into the database
Quiz.insertMany(quizzes)
  .then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close(); // Close the connection after insert
  })
  .catch((err) => {
    console.error('Error inserting data:', err);
    mongoose.connection.close();
  });
