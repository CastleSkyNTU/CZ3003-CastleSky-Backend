const QuestionBank = require("../models/questions.model.js");
// Create and Save a new QuestionBank
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a QuestionBank
  const questionBank = new QuestionBank({
    miniGameID: req.body.miniGameID,
    questions: req.body.questions,
    answers: req.body.answers,
  });

  // Save QuestionBank in the database
  QuestionBank.create(questionBank, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the QuestionBank.",
      });
    else res.send(data);
  });
};

// Retrieve all QuestionBanks from the database.
exports.findAll = (req, res) => {
  console.log(req.session);
  QuestionBank.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questionBanks.",
      });
    else res.send(data);
  });
};

// Find a single QuestionBank with a questionBankId
exports.findByID = (req, res) => {
  QuestionBank.findById(req.params.questionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found QuestionBank with id ${req.params.questionBankId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving QuestionBank with id " +
            req.params.questionBankId,
        });
      }
    } else res.send(data);
  });
};

// Find a single QuestionBank with a questionBankId
exports.findByGID = (req, res) => {
  QuestionBank.findByGid(req.params.gID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found QuestionBank with gid ${req.params.gID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving QuestionBank with gid " + req.params.gID,
        });
      }
    } else res.send(data);
  });
};

// Update a QuestionBank identified by the questionBankId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  QuestionBank.updateById(
    req.params.questionBankId,
    new QuestionBank(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found QuestionBank with id ${req.params.questionBankId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating QuestionBank with id " +
              req.params.questionBankId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a QuestionBank with the specified questionBankId in the request
exports.delete = (req, res) => {
  QuestionBank.remove(req.params.questionBankId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found QuestionBank with id ${req.params.questionBankId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete QuestionBank with id " +
            req.params.questionBankId,
        });
      }
    } else res.send({ message: `QuestionBank was deleted successfully!` });
  });
};

// Delete all QuestionBanks from the database.
exports.deleteAll = (req, res) => {
  QuestionBank.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all questionBanks.",
      });
    else res.send({ message: `All QuestionBanks were deleted successfully!` });
  });
};
