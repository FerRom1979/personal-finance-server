const jwt = require("jsonwebtoken")
require("dotenv").config()

const User = require("../models/usersModels")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decode = jwt.verify(token, process.env.JWK_SECRET)
    const user = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    })

    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user

    next()
  } catch (err) {
    res.status(401).send({ Error: "Please authenticate!!!" })
  }
}

module.exports = auth
