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
    `select World.WorldId, WorldName, CountryId, CountryName, CountryAccessCode, CityId, CityName, Country.MinigameId, MinigameQuestionId
    from World 
    join WorldCountryCity on World.WorldId = WorldCountryCity.WorldId
    join CountryCity using (CountryCityId)
    join Country using (CountryId)
    join City using (CityId)
    left join MinigameQuestionBank on City.CityId = MinigameQuestionBank.MinigameQuestionBankId where World.WorldId = ${worldId} order by CityId`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      r = Object.values(JSON.parse(JSON.stringify(res)));
      // for (key in res[0].keys()) {
      //   console.log(key);
      // }
      dat = {
        WorldId: res[0].WorldId,
        WorldName: res[0].WorldName,
        Countries: [],
      };

      console.log(res);
      r.forEach((entry) => {
        // console.log(entry);
        var found = dat.Countries.find(
          (el) => el.CountryId === entry.CountryId
        );
        if (!found) {
          countrydata = {
            CountryId: entry.CountryId,
            CountryName: entry.CountryName,
            CountryAccessCode: entry.CountryAccessCode,
            Cities: [
              {
                CityId: entry.CityId,
                CityName: entry.CityName,
                Minigame: [
                  {
                    MinigameId: entry.MinigameId,
                    MinigameQuestionId: entry.MinigameQuestionId,
                  },
                ],
              },
            ],
          };
          dat.Countries.push(countrydata);
        } else {
          // console.log(found);
          var cityfound = found.Cities.find((el) => el.CityId === entry.CityId);
          if (!cityfound) {
            citydata = {
              CityId: entry.CityId,
              CityName: entry.CityName,
              Minigame: [
                {
                  MinigameId: entry.MinigameId,
                  MinigameQuestionId: entry.MinigameQuestionId,
                },
              ],
            };
            found.Cities.push(citydata);
          } else {
            minigamedata = {
              MinigameId: entry.MinigameId,
              MinigameQuestionId: entry.MinigameQuestionId,
            };
            cityfound.Cities.push(minigamedata);
          }
        }
      });

      if (res.length) {
        console.log("found world: ", dat);
        result(null, dat);
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
        data = {};
        data["userId"] = userId;
        data["Username"] = res[0].UserName;
        worldsArr = [];
        res.forEach((element) => {
          worldHash = {};
          worldHash["WorldId"] = element.WorldId;
          worldHash["WorldName"] = element.WorldName;
          worldsArr.push(worldHash);
        });
        data["Worlds"] = worldsArr;
        result(null, data);
        return;
      }

      // not found World with the id
      result({ kind: "not_found" }, null);
    }
  );
};

World.getClassWorlds = (className, result) => {
  sql.query(
    `SELECT WorldName FROM db_castlesky.WorldClass 
    join World using (WorldId)
    join Class using (ClassId)
    where ClassName = \"${className}\"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        worldArr=[]
        res.forEach((element)=>{
          worldArr.push(element.WorldName);
        })
        result(null, worldArr);
        return;
      }

      // not found World with the id
      result({ kind: "not_found" }, null);
    }
  );
};

World.getWorldCountries = (worldName, result) => {
  sql.query(
    `select distinct CountryName from World
    join WorldCountryCity using (WorldId)
    join CountryCity using (CountryCityId)
    join Country using (CountryId)
    where WorldName = \"${worldName}\"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        countryArr=[]
        res.forEach((element)=>{
          countryArr.push(element.CountryName);
        })
        result(null, countryArr);
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

World.loadCountryCode = (result) => {
  sql.query(
    "select WorldId, WorldName, CountryId, CountryName, CountryAccessCode from World join WorldCountryCity using (WorldId) join CountryCity using (CountryCityId) join Country using (CountryId)",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("worlds: ", res);
      result(null, res);
    }
  );
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
