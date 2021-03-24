require("dotenv").config();
const express = require("express");
require("./db/mongoose");

const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

// For read json
app.use(express.json());

// Create user
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server in port ${port}`);
});
