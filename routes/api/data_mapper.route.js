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
router.route("/filter").get((req, res, next) => {
  res.send("It workds");
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
