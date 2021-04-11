const express = require("express");
const router = new express.Router();

// Middleware
const auth = require("../middleware/auth");

// Models
const User = require("../models/usersModels");

// Create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login user
router.post("/users/login", async (req, res) => {
  const { body } = req;
  try {
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  } catch (err) {
    res.status(500).send();
  }
});

// Logout All
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

// Get all users
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get me
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// Get user
router.get("/users/:id", async (req, res) => {
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
router.patch("/users/:id", async (req, res) => {
  const { params, body } = req;

  // Check is valid update
  const updates = Object.keys(body);
  const allowedUpdate = ["name", "lastName", "email", "age", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid update!!!" });
  }
  try {
    const user = await User.findById(params.id);
    updates.forEach((update) => (user[update] = body[update]));
    await user.save();

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
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

module.exports = router;
