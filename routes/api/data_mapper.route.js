let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Model
let dataMapperModel = require("../../models/data_mapper");

// Show all data
router.route("/data").get((req, res, next) => {
  dataMapperModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Filter data
router
  .route("/filter/:providerId")
  .get((req, res, next) => {
    console.log(req.query);
    // Compose quaery values
    let name = req.query.name.split(":")[1];
    let age = req.query.name.split(":")[1];
    let timestamp = req.query.name.split(":")[1];
    console.log(name);

    return;
    dataMapperModel.find(
      {
        providerId: req.params.providerId,
        name,
        age: { $lt: 30 },
        timestamp: { $lt: 30 }
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      }
    );
  });

// Create data specification
router.route("/create").post((req, res, next) => {
  const dataSpecification = new dataMapperModel({
    providerId: req.body.providerId,
    fields: [
      {
        name: req.body.fields[0].name,
        age: req.body.fields[0].age,
        timestamp: req.body.fields[0].timestamp
      }
    ]
  });

  dataSpecification
    .save()
    .then(response => res.status(200).json({data: response, success: "true" }))
    .catch(err => console.log(err));
});

module.exports = router;
