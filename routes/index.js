const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.post("/signup", createUser);
router.post("/signin", login);

module.exports = router;
