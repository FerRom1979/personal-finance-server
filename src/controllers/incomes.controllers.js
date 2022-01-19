const Incomes = require("../models/IncomesModels")

const createIncomes = async (req, res) => {
  const income = new Incomes({
    ...req.body,
    owner: req.user._id,
  })

  try {
    await income.save()
    return res.status(201).send(income)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getAllIncomes = async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.incomePermanent) {
    match.IncomePermanent = req.query.incomePermanent === "true"
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":")
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1
  }
  try {
    await req.user
      .populate({
        path: "incomes",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate()
    res.send(req.user.incomes)
  } catch (err) {
    res.status(500).send(err)
  }
}

const counterIncomes = async (req, res) => {
  const total = await Incomes.find().count()
  try {
    res.status(200).json({ total })
  } catch (err) {
    res.status(500).send(err)
  }
}

const filterIncomes = async (req, res) => {
  const { category } = req.query
  const incomes = await Incomes.find({
    category,
  })
  try {
    res.status(200).send(incomes)
  } catch (err) {
    res.status(500).send(err)
  }
}

const paginationIncomes = async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.incomePermanent) {
    match.IncomePermanent = req.query.incomePermanent === "true"
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":")
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1
  }
  try {
    await req.user
      .populate({
        path: "incomes",
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate()
    res.send(req.user.incomes)
  } catch (err) {
    res.status(500).send(err)
  }
}

const getIncomeById = async (req, res) => {
  const _id = req.params.id
  try {
    const income = await Incomes.findOne({ _id, owner: req.user._id })
    if (!income) {
      return res.status(404).send()
    }
    res.send(income)
  } catch (err) {
    res.status(500).send(err)
  }
}

const editIncome = async (req, res) => {
  const { params, body, user } = req

  // Check is valid update
  const updates = Object.keys(body)
  const allowedUpdate = [
    "category",
    "description",
    "typeOfIncome",
    "totalIncome",
    "IncomePermanent",
  ]
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid update!!" })
  }
  try {
    const income = await Incomes.findOne({ _id: params.id, owner: user._id })
    if (!income) {
      return res.status(404).send()
    }
    updates.forEach((update) => (income[update] = body[update]))
    income.save()
    res.status(200).send(income)
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteIncome = async (req, res) => {
  const { params, user } = req
  try {
    const income = await Incomes.findOneAndDelete({
      _id: params.id,
      owner: user._id,
    })
    if (!income) {
      return res.status(404).send()
    }
    res.status(200).send(income)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  createIncomes,
  getAllIncomes,
  counterIncomes,
  filterIncomes,
  paginationIncomes,
  getIncomeById,
  editIncome,
  deleteIncome,
}
