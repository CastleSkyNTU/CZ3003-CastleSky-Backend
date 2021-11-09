module.exports = (app) => {
  const users = require("../controllers/questions.controller.js");

  // Create a new User
  app.post("/questions", users.create);

  // Retrieve all Users
  app.get("/usquestionsers", users.findAll);

  // Retrieve a single User with userId
  app.get("/questions/:userId", users.findByID);

  // Update a User with userId
  app.put("/users/:userId", users.update);

  // Delete a User with userId
  app.delete("/users/:userId", users.delete);

  // Create a new User
  app.delete("/users", users.deleteAll);
};
