const Country = require("../models/country.model.js");

// Retrieve Access Code
exports.getCountryAccesscodes = (req, res) => {
  Country.accessCode(req.params.CountryName, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving worlds.",
      });
    else res.send(data);
  });
};