const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false, // You can remove this line if you don't need userId
  },
  accessToken: {
    type: String,
    required: false, // Change required to false for optional
  },
  refreshToken: {
    type: String,
    required: false, // Change required to false for optional
  },
  expiration: {
    type: Date,
    required: false, // Change required to false for optional
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
