const World = require("../models/world.model.js");
// Create and Save a new World
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a World
  const world = new World({
    WorldName: req.body.WorldName,
  });

  // Save World in the database
  World.create(world, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the World.",
      });
    else res.send(data);
  });
};

// Retrieve all Worlds from the database.
exports.findAll = (req, res) => {
  World.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving worlds.",
      });
    else res.send(data);
  });
};

exports.loadCountryCode = (req, res) => {
  World.loadCountryCode((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving worlds.",
      });
    else res.send(data);
  });
};

// Find a single World with a worldId
exports.loadWorldData = (req, res) => {
  World.loadWorldData(req.params.worldId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found World with id ${req.params.worldId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving World with id " + req.params.worldId,
        });
      }
    } else res.send(data);
  });
};

// Find a single World with a type
exports.getUserWorlds = (req, res) => {
  World.getUserWorlds(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found World with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving World with id " + req.params.userId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Update a World identified by the worldId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  World.updateById(req.params.worldId, new World(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found World with id ${req.params.worldId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating World with id " + req.params.worldId,
        });
      }
    } else res.send(data);
  });
};

// Delete a World with the specified worldId in the request
exports.delete = (req, res) => {
  World.remove(req.params.worldId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found World with id ${req.params.worldId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete World with id " + req.params.worldId,
        });
      }
    } else res.send({ message: `World was deleted successfully!` });
  });
};

// Delete all Worlds from the database.
exports.deleteAll = (req, res) => {
  World.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all worlds.",
      });
    else res.send({ message: `All Worlds were deleted successfully!` });
  });
};


exports.getClassWorlds = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  World.getClassWorlds(req.params.className, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found World with id ${req.params.className}.`,
        });
      } else {
        res.status(500).send({
          message: "Error getting Worlds with class id " + req.params.className,
        });
      }
    } else res.send(data);
  });
};