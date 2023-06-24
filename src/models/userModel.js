const mongoose = require("../config/mongoose.config");
//const mongoose = require ("mongoose");

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
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
