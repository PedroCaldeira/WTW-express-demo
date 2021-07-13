const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", (req, res) => {
  const data = req.body;
  if (data.age < 18) {
    res.send("UNDERAGE");
  } else {
    res.send("ALL GOOD");
  }
});

app.get("/", (req, res) => {
  console.table(req.query);
  const greeting = req.query.message || "World";
  res.send(`<h1>Hello ${greeting}</h1>`);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send({ message: req.body });
});

app.listen(port, () => {
  console.warn(`Server is listening on http://localhost:${port}`);
});

module.exports = app;
