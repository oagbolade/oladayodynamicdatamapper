const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("An alligator approaches!");
});
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app listening on port ${port}`));
