module.exports = (app) => {
  const cityscores = require("../controllers/cityscore.controller.js");

  // Update score
  app.post("/updateScore", cityscores.create);

  // Load leaderboard 
  app.get("/loadLeaderBoard", cityscores.loadLeaderBoard);

  // Retrieve summary report
  app.get("/getSummaryReport/:CountryName/:ClassName", cityscores.getSummaryReport);

  // Retrieve leaderboard based on countryname
  app.get("/getLeaderboardByCountry/:CountryName", cityscores.loadLeaderBoardByCountry);
};
