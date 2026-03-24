const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  ALREADY_EXISTS,
  AUTHORIZATION_REQUIRED,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const createUser = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return res.status(201).send(userWithoutPassword);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res
        .status(ALREADY_EXISTS)
        .send({ message: "Email Already Exists" });
    }
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).send({ message: "Invalid data" });
    }
    return res
      .status(SERVER_ERROR)
      .send({ message: "An error has occurred on the server." });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);

      if (err.message === "Incorrect email or password") {
        return res
          .status(AUTHORIZATION_REQUIRED)
          .send({ message: "Incorrect email or password" });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, avatar },
      { new: true, runValidators: true }
    ).orFail();

    return res.status(200).send(updatedUser);
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).send({ message: "Invalid data" });
    }

    if (err.name === "DocumentNotFoundError") {
      return res.status(NOT_FOUND).send({ message: "User not found" });
    }

    return res
      .status(SERVER_ERROR)
      .send({ message: "An error has occurred on the server." });
  }
};

module.exports = { getUsers, createUser, getCurrentUser, updateUser, login };
