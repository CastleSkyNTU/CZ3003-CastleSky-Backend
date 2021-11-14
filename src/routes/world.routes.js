module.exports = (app) => {
  const world = require("../controllers/world.controller.js");

  // Retrieve all Worlds
  app.get("/world", world.findAll);
  
  // Retrieve country code
  app.get("/loadCountryCode", world.loadCountryCode);

  // Retrieve Worlds based on user Id
  app.get("/getUserWorlds/:userId", world.getUserWorlds);

  // Retrieve the worlds a class has access to
  app.get("/getClassWorlds/:className", world.getClassWorlds);

  // Retrieve the worlds a student has access to
  app.get("/getStudentWorlds/:userId", world.getStudentWorlds);

  // Retrieve the countries the world has
  app.get("/getWorldCountries/:worldName", world.getWorldCountries);

  // Retrieve a single world with worldid
  app.get("/loadWorldData/:worldId", world.loadWorldData);
};
