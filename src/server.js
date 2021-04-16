require("dotenv").config();
const express = require("express");
require("./db/mongoose");

//Routers
const usersRouters = require("./routers/usersRouters");
const incomesRouters = require("./routers/incomesRouters");

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// For read json
app.use(express.json());

// Use routers
app.use(usersRouters);
app.use(incomesRouters);

app.listen(port, () => {
  console.log(`Server in port ${port}`);
});

const Incomes = require("./models/IncomesModels");
const User = require("./models/usersModels");

const main = async () => {
  /* const income = await Incomes.findById("607974aec1f82517a69224c4");
  await income.populate("owner").execPopulate();
  console.log(income.owner); */

  const user = await User.findById("60789e1eb328e7bc99486118");
  await user.populate("incomes").execPopulate();
  console.log(user.incomes);
};

main();
