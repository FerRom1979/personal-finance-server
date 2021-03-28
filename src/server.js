require("dotenv").config();
const express = require("express");
require("./db/mongoose");

// models
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

// For read json
app.use(express.json());

// Create user
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get user
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User no found!!!");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update user
app.patch("/users/:id", async (req, res) => {
  const { params, body } = req;

  // Check is valid update
  const updates = Object.keys(body);
  const allowedUpdate = ["name", "lastName", "email", "age", "password"];
  const isValidOperation = updates.every((update) => allowedUpdate.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid update!!!" });
  }
  try {
    const user = await User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ Error: "User not found!!" });
    }
    res.status(404).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server in port ${port}`);
});
