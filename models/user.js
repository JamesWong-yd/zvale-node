const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  cars: [{
    type: Schema.Types.ObjectId,
    ref: 'cars'
  }]
});

const user = mongoose.model('user', userSchema);
module.exports = user;