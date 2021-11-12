module.exports = (app) => {
  const cityscores = require("../controllers/cityscore.controller.js");

  // Create a new Customer
  app.post("/updateScore", cityscores.create);

  // Retrieve all Customers
  app.get("/loadLeaderBoard", cityscores.loadLeaderBoard);

  // Retrieve summary report
  app.get("/getSummaryReport/:CountryName/:ClassName", cityscores.getSummaryReport);

  // Retrieve leaderboard
  app.get("/getLeaderboardByCountry/:CountryName", cityscores.loadLeaderBoardByCountry);

  // Retrieve a single Customer with cardId
  app.get("/cityscores/:cardId", cityscores.findByID);

  // Delete a Customer with cardId
  app.delete("/cityscores/:cardId", cityscores.delete);

  // Create a new Customer
  app.delete("/cityscores", cityscores.deleteAll);
};
