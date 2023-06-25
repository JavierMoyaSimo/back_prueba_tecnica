const express = require("express");
const usersRouter = express.Router();

const {
  createUser,
  CreateUserException,
  loginByEmail,
  LoginByEmailException,
  getAllUsers,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const {
  authBearerMiddleware,
  isValidRole,
  isValidUser,
} = require("../middlewares/authMiddleware");

//Add user
usersRouter.post("/adduser", async (request, response) => {
  const name = request.body.name;
  const phone = request.body.phone;
  const email = request.body.email;
  const password = request.body.password;
  const rol = request.body.rol;

  let response_user = null;
  let response_result = null;

  if (!name || !email || !password || !phone) {
    response_result = CreateUserException.incorrectParameters;
  } else {
    try {
      response_user = await createUser(name, phone, email, password, rol);

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

//middleware para las rutas de authBarer
usersRouter.use(authBearerMiddleware);

//Get all users(only admin)
usersRouter.get("/listusers", isValidRole("admin"), getAllUsers);

// Modify user data
usersRouter.patch("/modifyuser/:email", isValidUser(), updateUser);

//Delete user(only admin)
usersRouter.delete("/deleteUser/:email", isValidRole("admin"), deleteUser);

module.exports = usersRouter;
