const exportFormat = require('../middleware/exportFormat')
const User = require('../models/user')
const Car = require('../models/cars')

module.exports = {
  // 所有用户
  index: async (req, res, next) => {
    const users = await User.find({})
    res.status(200).json(exportFormat.list(users, users.length));
  },
  // 创建用户
  newUser: async (req, res, next) => {
    const newUser = new User(req.value.body)
    const user = await newUser.save()
    res.status(201).json(exportFormat.normal(user))
  },
  // 根据id查找用户
  getUser: async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId)
    res.status(200).json(exportFormat.normal(user, '获取成功'))
  },

  // 根据id更新用户所有信息
  replaceUser: async (req, res, next) => {
    const { userId } = req.value.params
    const newUser = req.value.body
    const user = await User.findByIdAndUpdate(userId, newUser)
    res.status(200).json({ status: true })
  },

  // 根据id更新用户部分信息
  updateUser: async (req, res, next) => {
    const { userId } = req.value.params
    const newUser = req.value.body
    const user = await User.findByIdAndUpdate(userId, newUser)
    res.status(200).json({ status: true })
  },

  // 根据用户Id查找用户车
  getUserCars: async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId).populate('cars')
    res.status(200).json(exportFormat.normal(user.cars, '获取成功'))
  },

  // 根据用户ID添加用户车
  newUserCar: async (req, res, next) => {
    const { userId } = req.value.params
    const newCar = new Car(req.value.body)
    const user = await User.findById(userId)
    newCar.seller = user
    await newCar.save()
    user.cars.push(newCar)
    await user.save()
    res.status(201).json({ status: true })
  }
}