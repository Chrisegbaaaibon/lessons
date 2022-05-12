const mongoose = require('mongoose')
require('dotenv').config()

exports.db = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('Connected successfully!')
  } catch (error) {
    console.log(error)
  }
}
