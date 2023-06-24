// TODO ESTO ES NUEVO!
const mongoose = require("../db");

const userSchema = {
  name: {
    type: "String",
    required: true,
    minLength: 2,
    maxLength: 25,
  },
  phone: {
    type: "String",
    required: true,
    minLength: 9,
    maxLength: 9,
  },
  email: {
    type: "String",
    unique: true,
  },
  password: "String",
  create: {
    type: Date,
    default: Date.now,
  },
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
