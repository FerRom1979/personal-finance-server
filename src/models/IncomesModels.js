const mongoose = require("mongoose");
const validator = require("validator");
const usersModels = require("./usersModels");

const incomesSchema = new mongoose.Schema(
  {
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Incomes = mongoose.model("incomes", incomesSchema);

module.exports = Incomes;
