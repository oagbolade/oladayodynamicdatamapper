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
    // Compose quaery values
    let name = req.query.name.split(":");
    let age = req.query.age.split(":");
    let timestamp = req.query.timestamp.split(":");
    
    dataMapperModel.find(
      {
        providerId: req.params.providerId,
        fields: {
          $elemMatch: {
            name: name[1],
            age:
              age[0] === "lt"
                ? { $lt: age[1] }
                : age[0] === "gt"
                ? { $gt: age[1] }
                : age[0] === "eq" ? { $eq: age[1] } : age[1],
          }
        }
        // timestamp: { $lt: timestamp[1] }
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
