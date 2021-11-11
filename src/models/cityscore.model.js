const sql = require("./db.js");

// constructor
const CityScore = function (cityScore) {
  this.CityId = cityScore.CityId;
  this.UserId = cityScore.UserId;
  this.Score = cityScore.Score;
  this.Date = cityScore.Date;
};

CityScore.create = (newCityScore, result) => {
  sql.query("INSERT INTO CityScore SET ?", newCityScore, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cityScore: ", { id: res.insertId, ...newCityScore });
    result(null, { id: res.insertId, ...newCityScore });
  });
};

CityScore.findById = (cityScoreId, result) => {
  sql.query(
    `SELECT * FROM cityScores WHERE id = ${cityScoreId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found cityScore: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found CityScore with the id
      result({ kind: "not_found" }, null);
    }
  );
};

CityScore.findByType = (type, result) => {
  sql.query(`SELECT * FROM cityScores WHERE type = \"${type}\"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found CityScore with the id
    result({ kind: "not_found" }, null);
  });
};

CityScore.getRandomCityScore = (teamNumber, type, result) => {
  sql.query(
    `SELECT * FROM cityScores WHERE type = \"${type}\" ORDER BY RAND() LIMIT ${teamNumber}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found CityScore with the id
      result({ kind: "not_found" }, null);
    }
  );
};

CityScore.loadLeaderBoard = (result) => {
  sql.query(
    "select cityId, CityScore.userId, userName, class, score from CityScore left join User on CityScore.UserId = User.UserId",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("cityScores: ", res);
      result(null, res);
    }
  );
};

CityScore.updateById = (id, cityScore, result) => {
  sql.query(`SELECT * FROM cityScores WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    sql.query(
      "UPDATE cityScores SET type = ?, name = ? WHERE id = ?",
      [
        cityScore.type ? cityScore.type : res[0].type,
        cityScore.name ? cityScore.name : res[0].name,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found CityScore with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated cityScore: ", { id: id, ...cityScore });
        result(null, { id: id, ...cityScore });
      }
    );
  });
};

CityScore.remove = (id, result) => {
  sql.query("DELETE FROM cityScores WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found CityScore with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cityScore with id: ", id);
    result(null, res);
  });
};

CityScore.removeAll = (result) => {
  sql.query("DELETE FROM cityScores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cityScores`);
    result(null, res);
  });
};

module.exports = CityScore;
