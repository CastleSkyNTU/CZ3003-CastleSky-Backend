module.exports = (app) => {
  const country = require("../controllers/country.controller.js");

  // Retrieve access code using country name
  app.get("/getAccessCode/:CountryName", country.getCountryAccesscodes);
};
