const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { validateUserBody, validateLogin } = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

module.exports = router;
