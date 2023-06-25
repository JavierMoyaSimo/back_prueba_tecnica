const UserModel = require("../models/userModel");
const HandleError = require("./handleError");
const Security = require("../services/securityProvider");
const security = new Security();
// const CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");

//CREATE USER
const createUser = async (name, phone, email, password, rol) => {
  try {
    const doesEmailExist = await UserModel.findOne({
      email: email,
    }).exec();

    if (doesEmailExist) {
      throw new CreateUserException(CreateUserException.emailAlreadyInUser);
    }

    const newUser = new UserModel({
      name: name,
      phone: phone,
      email: email,
      password: security.encryptData(password), // Guardamos el password encriptado en la bbdd
      rol: rol,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

//LOGIN USER
const loginByEmail = async (email, password) => {
  try {
    const user = await UserModel.findOne({
      email: email,
    }).exec();

    if (!user) {
      throw new LoginByEmailException(
        LoginByEmailException.errorIncorrectEmailorPassword
      );
    }
    const originalPassword = security.decryptData(user.password);

    if (originalPassword != password) {
      throw new LoginByEmailException(
        LoginByEmailException.errorIncorrectEmailorPassword
      );
    }

    const secret = process.env.JWT_SECRET;
    if (secret.length < 10) {
      throw new Error("JWT_SECRET is not set");
    }

    const jwt = jsonwebtoken.sign(
      {
        name: user.name,
        phone: user.phone,
        email: user.email,
        rol: user.rol,
      },
      secret
    );

    return {
      message: "Login successful",
      jwt: jwt,
      name: user.name,
      phone: user.phone,
      email: user.email,
      rol: user.rol,
    };
  } catch (error) {
    throw error;
  }
};

//GET USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};


class LoginByEmailException extends HandleError {
  static errorIncorrectEmailorPassword = "INCORRECT_EMAIL_OR_PASSWORD";
  constructor(code) {
    super("Login By Email", code);
  }
}

class CreateUserException extends HandleError {
  static emailAlreadyInUser = "EMAIL_ALREADY_IN_USER";

  constructor(code) {
    super("Create User ", code);
  }
}

module.exports = {
  createUser,
  loginByEmail,
  LoginByEmailException,
  CreateUserException,
  getAllUsers,
};
