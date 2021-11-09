module.exports = (app) => {
  const questions = require("../controllers/questions.controller.js");

  // Create a new User
  app.post("/questions", questions.create);

  // Retrieve all Users
  app.get("/questions", questions.findAll);

  // Retrieve a single User with userId
  app.get("/questions/:userId", questions.findByID);

  // Update a User with userId
  app.put("/questions/:userId", questions.update);

  // Delete a User with userId
  app.delete("/questions/:userId", questions.delete);

  // Create a new User
  app.delete("/questions", questions.deleteAll);
};
