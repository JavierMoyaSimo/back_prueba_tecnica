const express = require("express");
const usersRouter = express.Router();

const {
  createUser,
  CreateUserException,
  loginByEmail,
  LoginByEmailException,
} = require("../controllers/userController");


//Add user
usersRouter.post("/adduser", async (request, response) => {
  const name = request.body.name;
  const phone = request.body.phone;
  const email = request.body.email;
  const password = request.body.password;

  let response_user = null;
  let response_result = null;

  if (!name || !email || !password || !phone ) {
    response_result = CreateUserException.incorrectParameters;
  } else {
    try {
      response_user = await createUser(name, phone, email, password);

      response_result = CreateUserException.success;
      
    } catch (error) {
      console.log("error", error);
      if (error.code != null) {
        response_result = error.code;
      } else {
        response_result = CreateUserException.unknownError;
      }
    }
  }

  response.json({
    user: response_user,
    result: response_result,
  });
});

//Login user
usersRouter.post("/login", async (request, response) => {
  let email = request.body.email;
  let password = request.body.password;

  let response_user = null;
  let response_result = null;
  
  if (email == null || password == null) {
    response_result = LoginByEmailException.incorrectParameters;
  } else {
    try {
      response_user = await loginByEmail(email, password);

      response_result = LoginByEmailException.success;

    } catch (error) {
      console.log(error.message );
      if (error.code != null) {
        response_result = error.code;
      } else {
        response_result = LoginByEmailException.unknownError;
      }
    }
  }
  response.json({
    user: response_user,
    result: response_result,
  });
});
module.exports = usersRouter;
