const sql = require("./db.js");

// constructor
const User = function (user) {
  this.EmailAddress = user.EmailAddress;
  this.PasswordHash = user.PasswordHash;
  this.UserName = user.UserName;
  this.RoleId = user.RoleId;
  this.Class = user.Class;
  this.SpriteFileName = user.SpriteFileName;
};

User.create = (newUser, result) => {
  sql.query(
    "select ClassId from Class where ClassName = ?",
    newUser.Class,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log(res);
      newUser.Class = res[0].ClassId;
    }
  );

  sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM User WHERE UserId = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByEmail = (EmailAddress, result) => {
  sql.query(
    `SELECT * FROM User WHERE EmailAddress = \"${EmailAddress}\"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found User with the id
      result({ kind: "not_found" }, null);
    }
  );
};

User.getTop20 = (result) => {
  sql.query(
    "SELECT id,UserName, SpriteFileName FROM User ORDER BY SpriteFileName DESC LIMIT 20",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("User: ", res);
      result(null, res);
    }
  );
};

User.getAll = (result) => {
  sql.query("SELECT * FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(`SELECT * FROM User WHERE UserId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    sql.query(
      "UPDATE User SET EmailAddress = ?, UserName = ?, PasswordHash=?, SpriteFileName = ?, RoleId = ?, Class = ? WHERE UserId = ?",
      [
        user.EmailAddress ? user.EmailAddress : res[0].EmailAddress,
        user.UserName ? user.UserName : res[0].UserName,
        user.PasswordHash ? user.PasswordHash : res[0].PasswordHash,
        user.SpriteFileName ? user.SpriteFileName : res[0].SpriteFileName,
        user.RoleId ? user.RoleId : res[0].RoleId,
        user.Class ? user.Class : res[0].Class,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  });
};

User.remove = (id, result) => {
  sql.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  sql.query("DELETE FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} User`);
    result(null, res);
  });
};

module.exports = User;
