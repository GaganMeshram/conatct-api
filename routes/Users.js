const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  postUser,
  getUserById,
  deleteUserById,
  editById
} = require("../controller/userController");

router.get("/", getAllUsers);

router.post("/", postUser);

router.get("/:id", getUserById);

router.delete("/:id", deleteUserById);

router.patch('/:id', editById)

module.exports = router;
