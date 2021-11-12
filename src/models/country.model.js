const sql = require("./db.js");

// constructor
const Country = function (country) {
  this.CountryName = country.CountryName;
};

Country.accessCode = (CountryName,result) => {
  CountryName = CountryName.split('_').join(' ')
  sql.query(`SELECT CountryAccessCode FROM db_castlesky.Country where CountryName = \"${CountryName}\"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length == 1) {
      result(null, res[0].CountryAccessCode);
      return;
    }

    console.log(`Retrieved ${CountryName} access code`);
    result(null, res);
  });
};

module.exports = Country;