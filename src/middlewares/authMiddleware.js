const jsonwebtoken = require("jsonwebtoken");

// MIDDLEWARE AUTENTICACION DE TOKEN
const authBearerMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const [type, jwt] = authorization.split(" ");
  try {
    if (type.toLowerCase() !== "bearer") {
      throw new Error("Invalid type");
    }

    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    req.auth = payload;
    console.log(req.auth, "AquiJWT");
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated" });
    return;
  }
};

module.exports = {authBearerMiddleware};
