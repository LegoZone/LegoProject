const mongoose = require('mongoose');

const packagesSchema = mongoose.Schema({
  name: { type: String, unique: true, required: true },
  length: { type: String, require: true },
  img: { type: String, required: false }
});

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = {
  legoPack: mongoose.model('legoPack', packagesSchema),
  users: mongoose.model('users', usersSchema)
};
