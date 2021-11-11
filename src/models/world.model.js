const sql = require("./db.js");

// constructor
const World = function (world) {
  this.WorldName = world.WorldName;
};

World.create = (newWorld, result) => {
  sql.query("INSERT INTO worlds SET ?", newWorld, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created world: ", { id: res.insertId, ...newWorld });
    result(null, { id: res.insertId, ...newWorld });
  });
};

World.loadWorldData = (worldId, result) => {
  sql.query(
    `select WorldId, WorldName, CountryId, CountryName, CountryAccessCode, CityId, CityName, Country.MinigameId, MinigameQuestionId
  from World 
  join WorldCountryCity using (WorldId)
  join CountryCity using (CountryCityId)
  join Country using (CountryId)
  join City using (CityId)
  left join MinigameQuestionBank on City.CityId = MinigameQuestionBank.MinigameQuestionBankId where WorldId = ${worldId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found world: ", res[0]);
        result(null, res);
        return;
      }

      // not found World with the id
      result({ kind: "not_found" }, null);
    }
  );
};

World.getUserWorlds = (userId, result) => {
  sql.query(
    `SELECT UserWorlds.UserId, UserName, World.WorldId, WorldName FROM UserWorlds JOIN World ON UserWorlds.WorldId = World.WorldId JOIN User ON User.UserId = UserWorlds.UserId WHERE UserWorlds.UserId = \"${userId}\"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        data = {
          userId: userId,
          Username: res[0].UserName,
          Worlds: res,
        };
        result(null, data);
        return;
      }

      // not found World with the id
      result({ kind: "not_found" }, null);
    }
  );
};

World.getRandomWorld = (teamNumber, type, result) => {
  sql.query(
    `SELECT * FROM worlds WHERE type = \"${type}\" ORDER BY RAND() LIMIT ${teamNumber}`,
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

      // not found World with the id
      result({ kind: "not_found" }, null);
    }
  );
};

World.getAll = (result) => {
  sql.query("SELECT * FROM worlds", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("worlds: ", res);
    result(null, res);
  });
};

World.updateById = (id, world, result) => {
  sql.query(`SELECT * FROM worlds WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    sql.query(
      "UPDATE worlds SET type = ?, name = ? WHERE id = ?",
      [
        world.type ? world.type : res[0].type,
        world.name ? world.name : res[0].name,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found World with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated world: ", { id: id, ...world });
        result(null, { id: id, ...world });
      }
    );
  });
};

World.remove = (id, result) => {
  sql.query("DELETE FROM worlds WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found World with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted world with id: ", id);
    result(null, res);
  });
};

World.removeAll = (result) => {
  sql.query("DELETE FROM worlds", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} worlds`);
    result(null, res);
  });
};

module.exports = World;
