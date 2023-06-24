const router = require("express").Router();

const user = require("./routers/userRouter");

router.use("/", user);

module.exports = router;
