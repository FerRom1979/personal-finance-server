const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

//Models
const Incomes = require("../models/IncomesModels");

//Create Income
router.post("/incomes", auth, async (req, res) => {
  const income = new Incomes({
    ...req.body,
    owner: req.user._id,
  });
  console.log(req.body);
  try {
    await income.save();
    return res.status(201).send(income);
  } catch (err) {
    res.status(400), send(err);
  }
});

//GET all Incomes
router.get("/incomes", auth, async (req, res) => {
  try {
    const incomes = await Incomes.find({ owner: req.user._id });
    return res.status(200).send(incomes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get income
router.get("/incomes/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const income = await Incomes.findOne({ _id, owner: req.user._id });
    await req.user.populate("incomes").execPopulate();
    if (!income) {
      // return res.status(404).send();
      return res.send(req.user.incomes);
    }
    res.send(income);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update income
router.patch("/incomes/:id", auth, async (req, res) => {
  const { params, body, user } = req;

  // Check is valid update
  const updates = Object.keys(body);
  const allowedUpdate = [
    "category",
    "description",
    "typeOfIncome",
    "totalIncome",
    "incomePermanent",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid update!!" });
  }
  try {
    const income = await Incomes.findOne({ _id: params.id, owner: user._id });
    if (!income) {
      return res.status(404).send();
    }
    updates.forEach((update) => (income[update] = body[update]));
    income.save();
    res.status(200).send(income);
  } catch (err) {
    res.status(400).send(err);
  }
});

//delete income
router.delete("/incomes/:id", auth, async (req, res) => {
  const { params, user } = req;
  try {
    const income = await Incomes.findOneAndDelete({
      _id: params.id,
      owner: user._id,
    });
    if (!income) {
      return res.status(404).send();
    }
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
