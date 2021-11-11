const CityScore = require("../models/cityscore.model.js");
// Create and Save a new CityScore
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a CityScore
  const cityScore = new CityScore({
    CityId: req.body.cityId,
    UserId: req.body.userId,
    Score: req.body.score,
    Date: new Date(),
  });

  // Save CityScore in the database
  CityScore.create(cityScore, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CityScore.",
      });
    else res.send(data);
  });
};

// Retrieve all CityScores from the database.
exports.findAll = (req, res) => {
  CityScore.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cityScores.",
      });
    else res.send(data);
  });
};

// Find a single CityScore with a cityScoreId
exports.findByID = (req, res) => {
  CityScore.findById(req.params.cityScoreId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CityScore with id ${req.params.cityScoreId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving CityScore with id " + req.params.cityScoreId,
        });
      }
    } else res.send(data);
  });
};

// Find a single CityScore with a type
exports.findByType = (req, res) => {
  CityScore.findByType(req.params.type, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CityScore with type ${req.params.type}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving CityScore with type " + req.params.type,
        });
      }
    } else res.send(data);
  });
};

// Update a CityScore identified by the cityScoreId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  CityScore.updateById(
    req.params.cityScoreId,
    new CityScore(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found CityScore with id ${req.params.cityScoreId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating CityScore with id " + req.params.cityScoreId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a CityScore with the specified cityScoreId in the request
exports.delete = (req, res) => {
  CityScore.remove(req.params.cityScoreId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CityScore with id ${req.params.cityScoreId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete CityScore with id " + req.params.cityScoreId,
        });
      }
    } else res.send({ message: `CityScore was deleted successfully!` });
  });
};

// Delete all CityScores from the database.
exports.deleteAll = (req, res) => {
  CityScore.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cityScores.",
      });
    else res.send({ message: `All CityScores were deleted successfully!` });
  });
};
