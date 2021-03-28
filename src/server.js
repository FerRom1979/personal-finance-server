require("dotenv").config();
const express = require("express");
require("./db/mongoose");

// models
const User = require("./models/user");
const Incomes = require("./models/Incomes");

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
//Create Income
app.post("/incomes", async (req, res) => {
  const income = new Incomes(req.body);
  try {
    await income.save();
    return res.status(201).send(income);
  } catch (err) {
    res.status(400), send(err);
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

//GET all Incomes
app.get("/incomes", async (req, res) => {
  try {
    const incomes = await Incomes.find({});
    return res.status(200).send(incomes);
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

// Get income
app.get("/incomes/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const income = await Incomes.findById(_id);
    if (!income) {
      return res.status(500).send("Income not found!");
    }
    res.send(income);
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

// Update income
app.patch("/incomes/:id", async (req, res) => {
  const { params, body } = req;

  // Check is valid update
  const updates = Object.keys(body);
  const allowedUpdate = ["category", "description", "typeOfIncome", "totalIncome", "incomePermanent"];
  const isValidOperation = updates.every((update) => allowedUpdate.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid update!!" });
  }
  try {
    const income = await Incomes.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!income) {
      return res.status(404).send();
    }
    res.status(200).send(income);
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
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete income
app.delete("/incomes/:id", async (req, res) => {
  try {
    const income = await Incomes.findByIdAndDelete(req.params.id);
    if (!income) {
      return res.status(404).send("Income not found");
    }
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server in port ${port}`);
});
