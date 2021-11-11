module.exports = (app) => {
  const world = require("../controllers/world.controller.js");

  // Create a new User
  app.post("/users", world.create);

  // Retrieve all Users
  app.get("/world", world.findAll);

  app.get("/loadCountryCode", world.loadCountryCode);

  // Retrieve Top 20 Users
  app.get("/getUserWorlds/:userId", world.getUserWorlds);

  // Retrieve a single User with userId
  app.get("/loadWorldData/:worldId", world.loadWorldData);

  // Update a User with userId
  app.put("/users/:userId", world.update);

  // Delete a User with userId
  app.delete("/users/:userId", world.delete);

  // Create a new User
  app.delete("/users", world.deleteAll);
};
