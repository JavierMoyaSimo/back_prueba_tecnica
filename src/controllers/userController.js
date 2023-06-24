const UserModel = require("../models/userModel");
const HandleError = require("./handleError");
const Security = require("../services/securityProvider");
const security = new Security();
// const CryptoJS = require("crypto-js");

//CREAR USUARIO
const createUser = async (name, phone, email, password) => {
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
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginByEmail = async (email, password) => {
  
  const user = await UserModel.findOne({
    email: email,
  }).exec();

  if (!user) {
    throw new LoginByEmailException(LoginByEmailException.errorIncorrectEmailorPassword);
  }
  const originalPassword = security.decryptData(user.password);
  

  if (originalPassword != password) {
    throw new LoginByEmailException(
      LoginByEmailException.errorIncorrectEmailorPassword
    );
  }

  return user;
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
};
