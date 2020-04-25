const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let dataMapperSchema = new Schema(
  {
    providerId: {
      type: Number
    },
    fields: [
      {
        name: String,
        age: Number,
        timestamp: Number
      }
    ]
  },
  {
    collection: "data_mapper"
  }
);

module.exports = mongoose.model("data_mapper", dataMapperSchema);
