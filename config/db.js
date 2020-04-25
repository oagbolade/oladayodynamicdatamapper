const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  db: process.env.DB_CONFIG || "mongodb://localhost:27017/dynamic_data_mapper"
};
