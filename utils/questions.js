try {
  // Read the questions data from the JSON file
  const questionsData = require('../data/questions.json');
  console.log('Successfully imported questionsData:', questionsData);

  // Destructure the questions data into respective arrays
  const { bodyQuestions, careerQuestions, loveQuestions, psychologyQuestions } = questionsData;

  // Export the questions to be used in other files
  module.exports = {
      bodyQuestions,
      careerQuestions,
      loveQuestions,
      psychologyQuestions
  };
} catch (error) {
  console.error('Error importing questions.json:', error);
}