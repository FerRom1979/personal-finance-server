const mongoose = require("mongoose")
require("dotenv").config()

const connectionURL = process.env.CONNECTION_URL

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
