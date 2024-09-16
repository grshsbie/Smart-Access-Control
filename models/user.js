const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user' // Regular users by default
   }
});

module.exports = mongoose.model('User', userSchema);
