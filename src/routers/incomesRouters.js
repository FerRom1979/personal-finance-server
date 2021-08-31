const express = require("express")
const auth = require("../middleware/auth")
const router = new express.Router()

// controllers
const {
  createIncomes,
  getAllIncomes,
  counterIncomes,
  filterIncomes,
  paginationIncomes,
  getIncomeById,
  editIncome,
  deleteIncome,
} = require("../controllers/incomes.controllers")

// Models
const Incomes = require("../models/IncomesModels")

// Create Income
router.post("/incomes", auth, createIncomes)

// Get all incomes
router.get("/incomes", auth, getAllIncomes)

// counter incomes
router.get("/incomes/counter", auth, counterIncomes)

// filter
router.get("/incomes/search", auth, filterIncomes)

// get income per page
router.get("/incomes/page", auth, paginationIncomes)

// Get income by id
router.get("/incomes/:id", auth, getIncomeById)

// Update income
router.patch("/incomes/:id", auth, editIncome)

// delete income
router.delete("/incomes/:id", auth, deleteIncome)

module.exports = router
