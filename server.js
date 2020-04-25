let express = require("express");
let bodyParser = require("body-parser");
const app = express();

let mongoose = require("mongoose");
let cors = require("cors");

let dbConfig = require("./config/db");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

// Express Route
const data = require("./routes/api/data_mapper.route");

app.use("/api", data);

app.get("/", (req, res) => {
  res.send("Test endpoint");
});

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    error => {
      console.log("Could not connect to database : " + error);
    }
  );

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}`));

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
