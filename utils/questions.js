// Import the questions JSON directly.  Using `require` avoids the need for
// Node's `fs` module which isn't available in the mini-program runtime.
// Read the questions data from the JSON file
const questionsData = require(
  '../data/questions.json'
);

// Destructure the questions data into respective arrays
const { bodyQuestions, careerQuestions, loveQuestions, psychologyQuestions } = questionsData;

// Export the questions to be used in other files
module.exports = {
  bodyQuestions,
  careerQuestions,
  loveQuestions,
  psychologyQuestions
};
