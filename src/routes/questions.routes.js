module.exports = (app) => {
  const questions = require("../controllers/questions.controller.js");

  // Create a new question
  app.post("/questions", questions.create);

  // Retrieve all questions
  app.get("/questions", questions.findAll);

  // Retrieve a single question with questionId
  app.get("/questions/:questionId", questions.findByID);

  // Update a question
  app.put("/questions/:userId", questions.update);

  // Delete a question with question id
  app.delete("/questions/:userId", questions.delete);

  // Delete questions
  app.delete("/questions", questions.deleteAll);
};
