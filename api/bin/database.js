const mongoose = require('mongoose')
require('dotenv').config()

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    })
    .then((con) => {
      console.log(`DB connected with host: ${con.connection.host}`)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = connectDatabase
