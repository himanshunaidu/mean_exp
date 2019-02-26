const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: {type: String, require: true},
  username: {type: String, require: true},
  password: {type: String, require: true},
  content: {type: String, default: 'Nothing to Show'}
})

module.exports = mongoose.model('User', userSchema);
