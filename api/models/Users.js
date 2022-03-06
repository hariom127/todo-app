const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Please enter user name'],
      trim: true,
      min: 3,
      maxlength: [15, 'User name can not exceed 15 characters'],
    },
    taskName: {
      type: String,
      trim: true,
      min: 3,
    },
    age: {
      type: Number,
      trim: true,
      min: 18,
      max: 55,
    },
    hobby: { type: Array, default: [] },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Inactive',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      default: 'Male',
    },
    date: { type: Date },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Users', usersSchema)
