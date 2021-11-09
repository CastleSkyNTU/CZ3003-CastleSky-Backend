const sql = require("./db.js");

// constructor
const QuestionBank = function (questionBank) {
  this.miniGameID = questionBank.miniGameID;
  this.questions = questionBank.questions;
  this.answers = questionBank.answers;
};

QuestionBank.create = (newQuestionBank, result) => {
  sql.query(
    "INSERT INTO MinigameQuestionBank SET ?",
    newQuestionBank,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created MinigameQuestionBank: ", {
        id: res.insertId,
        ...newQuestionBank,
      });
      result(null, { id: res.insertId, ...newQuestionBank });
    }
  );
};

QuestionBank.findById = (questionBankId, result) => {
  sql.query(
    `SELECT * FROM MinigameQuestionBank WHERE id = ${questionBankId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found MinigameQuestionBank: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found QuestionBank with the id
      result({ kind: "not_found" }, null);
    }
  );
};

QuestionBank.findByminiGameID = (miniGameID, result) => {
  sql.query(
    `SELECT * FROM MinigameQuestionBank WHERE miniGameID = ${miniGameID}`,
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

      // not found QuestionBank with the id
      result({ kind: "not_found" }, null);
    }
  );
};

QuestionBank.getAll = (result) => {
  sql.query("SELECT * FROM MinigameQuestionBank", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("questionBanks: ", res);
    result(null, res);
  });
};

QuestionBank.updateById = (id, questionBank, result) => {
  sql.query(
    `SELECT * FROM MinigameQuestionBank WHERE id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      sql.query(
        "UPDATE MinigameQuestionBank SET questionBankScore = ?, companyName = ?, targetUser = ?, industry = ?, hotTrend = ? WHERE id = ?",
        [
          questionBank.questionBankScore
            ? questionBank.questionBankScore
            : res[0].questionBankScore,
          questionBank.companyName
            ? questionBank.companyName
            : res[0].companyName,
          questionBank.targetUser ? questionBank.targetUser : res[0].targetUser,
          questionBank.industry ? questionBank.industry : res[0].industry,
          questionBank.hotTrend ? questionBank.hotTrend : res[0].hotTrend,
          id,
        ],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }

          if (res.affectedRows == 0) {
            // not found QuestionBank with the id
            result({ kind: "not_found" }, null);
            return;
          }

          console.log("updated questionBank: ", { id: id, ...questionBank });
          result(null, { id: id, ...questionBank });
        }
      );
    }
  );
};

QuestionBank.remove = (id, result) => {
  sql.query("DELETE FROM MinigameQuestionBank WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found QuestionBank with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted MinigameQuestionBank with id: ", id);
    result(null, res);
  });
};

QuestionBank.removeAll = (result) => {
  sql.query("DELETE FROM MinigameQuestionBank", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} MinigameQuestionBank`);
    result(null, res);
  });
};

module.exports = QuestionBank;
