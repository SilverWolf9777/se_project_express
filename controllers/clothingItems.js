const clothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { name, weather, imageUrl } = req.body;
  clothingItem
    .findByIdAndUpdate(itemId, { name, weather, imageUrl }, { new: true })
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndRemove(itemId)
    .orFail()
    .then(() => {
      res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      res.status(SERVER_ERROR).send({ message: err.message });
    });
};

module.exports = { getItems, createItem, updateItem, deleteItem, likeItem, dislikeItem };
