let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Model
let dataMapperModel = require("../../models/data_mapper");

router.route("/data").get((req, res, next) => {
  res.send("It workds");
});

// Create data specification
router.route("/create").post((req, res, next) => {
  // console.log(req.body.providerId);
  // console.log(req.body.fields.name);
  // console.log(req.body.fields.age);
  // return;
  const dataSpecification = new dataMapperModel({
    providerId: 12345,
    fields: [
      {
        name: "Oladayo",
        age: 23,
        timestamp: 1587614729
      }
    ]
  });

  dataSpecification
    .save()
    // .then(res => res.status(200).json({ success: "true" }))
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

module.exports = router;
