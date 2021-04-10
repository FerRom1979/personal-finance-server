const express = require("express");
const router = new express.Router();

// Models
const User = require("../models/usersModels");

// Create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login user
router.post("/users/login", async (req, res) => {
  const { body } = req;
  try {
    const user = await User.findByCredentials(body.email, body.password);
  } catch (err) {}
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
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
<<<<<<< Updated upstream
    const user = await User.findById(params.id);
    updates.forEach((update) => (user[update] = body[update]));
    await user.save();
=======
    const user = await User.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
>>>>>>> Stashed changes

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
