const fs = require('fs');

// Read the questions data from the JSON file
const questionsData = JSON.parse(fs.readFileSync('../data/questions.json', 'utf8'));

// Destructure the questions data into respective arrays
const { bodyQuestions, careerQuestions, loveQuestions, psychologyQuestions } = questionsData;

// Export the questions to be used in other files
module.exports = {
  bodyQuestions,
  careerQuestions,
  loveQuestions,
  psychologyQuestions
};
