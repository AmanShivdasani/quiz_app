// src/App.js
import { useState, useEffect } from "react";

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    // Fetch quizzes from backend
    fetch("http://localhost:5000/api/quizzes")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.error("Error fetching quizzes:", err));
  }, []);

  const handleAnswer = (answer) => {
    // Update user answers for the current quiz
    const updatedAnswers = [...userAnswer];
    updatedAnswers[currentQuiz] = answer;
    setUserAnswer(updatedAnswers);
  };

  const handleNext = () => {
    if (userAnswer[currentQuiz]) {
      // Check if the selected answer is correct and update score
      if (userAnswer[currentQuiz] === quizzes[currentQuiz].correctAnswer) {
        setScore(score + 1);
      }

      // Move to the next question or end the quiz
      if (currentQuiz === quizzes.length - 1) {
        setQuizEnded(true);
      } else {
        setCurrentQuiz(currentQuiz + 1);
      }
    }
  };

  const handlePrevious = () => {
    // Go back to the previous question
    if (currentQuiz > 0) {
      setCurrentQuiz(currentQuiz - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuiz(0);
    setUserAnswer([]);
    setScore(0);
    setQuizEnded(false);
  };

  if (quizEnded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        {/* <BackgroundLinesDemo/>   */}
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Quiz Completed!
          </h1>
          <p className="text-xl text-center text-gray-600 mb-6">
            Your Score:{" "}
            <span className="font-bold text-blue-500">
              {score} / {quizzes.length}
            </span>
          </p>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Review Your Answers
            </h2>
            <ul className="space-y-4">
              {quizzes.map((quiz, index) => {
                const isCorrect = userAnswer[index] === quiz.correctAnswer;
                return (
                  <li
                    key={index}
                    className={`p-4 ${
                      isCorrect ? "bg-green-100" : "bg-red-100"
                    } rounded-md`}
                  >
                    <p className="font-semibold text-gray-800">
                      {quiz.question}
                    </p>
                    <p
                      className={`text-sm ${
                        isCorrect ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Your answer: {userAnswer[index]}
                    </p>
                    <p className="text-sm text-gray-600">
                      Correct answer: {quiz.correctAnswer}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            onClick={handleRestart}
            className="block w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!quizzes.length) {
    return <div>Loading quizzes...</div>;
  }

  const quiz = quizzes[currentQuiz];

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-slate-800">
      <div className="sticky top-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Quiz App</div>
          <div className="text-lg font-medium text-gray-600">
            Question {currentQuiz + 1} of {quizzes.length}
          </div>
        </div>
      </div>

      {/* Quiz content */}
      <div className="flex items-center justify-center min-h-screen py-8">
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            {quiz.question}
          </h1>
          <div className="space-y-4">
            {quiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full py-3 px-6 rounded-lg text-lg font-medium border border-transparent focus:outline-none transition duration-300 ${
                  userAnswer[currentQuiz] === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between gap-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="w-full py-3 bg-gray-400 text-white font-semibold text-lg rounded-lg hover:bg-gray-500 transition duration-300"
              disabled={currentQuiz === 0}
            >
              Previous
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              disabled={!userAnswer[currentQuiz]}
            >
              {currentQuiz === quizzes.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
