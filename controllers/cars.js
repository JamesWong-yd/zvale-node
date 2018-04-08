const exportFormat = require('../middleware/exportFormat')
const Car = require('../models/cars')
const User = require('../models/user')

module.exports = {
  index: async (req, res, next) => {
    const cars = await Car.find({})
    res.status(200).json(exportFormat.list(cars, cars.length));
  },
  newCar: async (req, res, next) => {
    const seller = await User.findById(req.value.body.seller)
    const newCar = req.value.body
    delete newCar.seller
    const car = new Car(newCar)
    car.seller = seller
    await car.save()
    seller.cars.push(car)
    await seller.save()
    res.status(200).json({ status: true })
  }
}
