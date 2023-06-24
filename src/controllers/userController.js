const UserModel = require("../models/userModel");
const databaseConection = require("../db");
const HandleError = require("./handleError");
const Security = require("../services/securityProvider");
const security = new Security();
const CryptoJS = require("crypto-js");

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

async function loginByEmail(email, password) {
  let db = await databaseConection.GetConection();

  const user = await db.collection("Users").findOne({
    email: email,
  });
  if (user == null) {
    throw new LoginByEmailException(LoginByEmailException.errorIncorrectEmail);
  }
  const bytes = security.decryptData(user.password);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  if (originalText != password) {
    throw new LoginByEmailException(
      LoginByEmailException.errorIncorrectPassword
    );
  }

  return user;
}

//ESTO ESTÁ MAL YA QUE NO PUEDES DECIR A UN USUARIO SI ES EL NOMBRE DE USUARIO O LA CONTRASEÑA LA QUE ESTÁ MAL, YA QUE NO ES SEGURO
class LoginByEmailException extends HandleError {
  static errorIncorrectPassword = "INCORRECT_PASSWORD";
  static errorIncorrectEmail = "UNKNOWN_EMAIL";
  //Por seguridad es correcto?
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
