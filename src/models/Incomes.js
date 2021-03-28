const mongoose = require("mongoose");
const validator = require("validator");

const Incomes = mongoose.model("incomes", {
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  typeOfIncome: {
    type: String,
    required: true,
    trim: true,
  },
  totalIncome: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("The Income must be a positive number");
      }
    },
  },
  IncomePermanent: {
    type: Boolean,
  },
});

module.exports = Incomes;
