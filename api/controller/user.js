const User = require('../models/Users')
const { successRes, errorRes } = require('../helper/responseApi')
const { exec } = require('child_process')
const { json } = require('express')
const ObjectId = require('mongodb').ObjectID

/**
 * @desc Create User
 * @path /user/create
 * @methods post
 */
exports.create = async (req, res) => {
  const { userName, taskName, gender, hobby, age, date, status } = req.body
  let data = {
    userName,
    taskName,
    gender,
    hobby: hobby,
    age,
    date,
    status,
  }
  const createUser = new User(data)
  createUser.save((error, data) => {
    if (error) {
      console.log(error)
      return res.status(400).json({
        message: 'Something went wrong!',
      })
    }
    if (data) {
      return res.status(200).json({
        message: 'User has been created !',
        user: data,
      })
    }
  })
}

/**
 * @desc get Users
 * @path /users/get-users
 * @methods get
 */
exports.getUsers = async (req, res) => {
  User.find({}).exec((err, users) => {
    if (users) {
      return res
        .status(200)
        .json(successRes('Get users successfully', users, res.statusCode))
    } else {
      return res
        .status(401)
        .json(errorRes('something went wrong!', res.statusCode))
    }
  })
}

/**
 * @desc get Users
 * @path /users/get-users
 * @methods get
 */
exports.getSingleUser = async (req, res) => {
  const { id } = req.params

  User.findOne({ _id: ObjectId(id) }).exec((err, user) => {
    if (user) {
      return res
        .status(200)
        .json(successRes('Get users successfully', user, res.statusCode))
    } else {
      return res
        .status(401)
        .json(errorRes('something went wrong!', res.statusCode))
    }
  })
}

/**
 * @desc delete user
 * @path /users/delete-user/:id
 * @methods delete
 */
exports.delete = async (req, res) => {
  const { id } = req.params
  console.log(req.params)
  User.deleteOne({ _id: ObjectId(id) }).exec((err, success) => {
    if (success) {
      return res
        .status(200)
        .json(
          successRes(
            'User has been deleted successfully',
            success,
            res.statusCode,
          ),
        )
    } else {
      return res
        .status(401)
        .json(errorRes('something went wrong!', res.statusCode))
    }
  })
}

/**
 * @desc update users
 * @path /users/update
 * @methods put
 */
exports.updateUser = async (req, res) => {
  const { userName, taskName, gender, hobby, age, date, status, id } = req.body

  User.findByIdAndUpdate(ObjectId(id), {
    userName,
    taskName,
    gender,
    hobby: JSON.parse(hobby),
    age,
    date,
    status,
  }).exec((err, user) => {
    if (user) {
      return res
        .status(200)
        .json(
          successRes('User has been updated successfully', [], res.statusCode),
        )
    } else {
      console.log(err)
      return res
        .status(401)
        .json(errorRes('something went wrong!', res.statusCode))
    }
  })
}
