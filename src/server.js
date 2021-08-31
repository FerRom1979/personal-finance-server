require("dotenv").config()
const express = require("express")
require("./db/mongoose")
const cors = require("cors")
//const expressFileUpload = require("express-fileupload")

//Routers
const usersRouters = require("./routers/usersRouters")
const incomesRouters = require("./routers/incomesRouters")

const app = express()
const port = process.env.PORT

app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})
// for file
//app.use(expressFileUpload())
// For read json
app.use(express.json())
app.use(cors())
// Use routers
app.use(usersRouters)
app.use(incomesRouters)

app.listen(port, () => {
  console.log(`Server in port ${port}`)
})
