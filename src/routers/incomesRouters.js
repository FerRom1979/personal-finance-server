const express = require("express");
const router = new express.Router();

//Models
const Incomes = require("../models/IncomesModels");

//Create Income
router.post("/incomes", async (req, res) => {
  const income = new Incomes(req.body);
  try {
    await income.save();
    return res.status(201).send(income);
  } catch (err) {
    res.status(400), send(err);
  }
});

//GET all Incomes
router.get("/incomes", async (req, res) => {
  try {
    const incomes = await Incomes.find({});
    return res.status(200).send(incomes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get income
router.get("/incomes/:id", async (req, res) => {
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

// Update income
router.patch("/incomes/:id", async (req, res) => {
  const { params, body } = req;

  // Check is valid update
  const updates = Object.keys(body);
  const allowedUpdate = ["category", "description", "typeOfIncome", "totalIncome", "incomePermanent"];
  const isValidOperation = updates.every((update) => allowedUpdate.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid update!!" });
  }
  try {
    const income = await Incomes.findById(params.id);
    updates.forEach((update) => (income[update] = body[update]));
    income.save();
    if (!income) {
      return res.status(404).send();
    }
    res.status(200).send(income);
  } catch (err) {
    res.status(400).send(err);
  }
});

//delete income
router.delete("/incomes/:id", async (req, res) => {
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

module.exports = router;
