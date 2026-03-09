const router = require("express").Router();
const { getUsers, createUser, getUser, updateUser, deleteUser } = require("../controllers/users");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userId", getUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
