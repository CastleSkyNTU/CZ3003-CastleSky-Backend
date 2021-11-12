module.exports = (app) => {
  const country = require("../controllers/country.controller.js");

  // Retrieve access code
  app.get("/getAccessCode/:CountryName", country.getCountryAccesscodes);
};
