const userModel = require("../model/Users");
const mongoose = require("mongoose");

//get all users

const getAllUsers = async (err, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//post user

const postUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new userModel(user);
    await newUser.save()
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

// get by user id

const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user." });
  }
  const user = await userModel.findById(id);
  if (!user) {
    return res.status(404).json({ error: "No such user." });
  }
  res.status(200).json(user);
};

//delete user by id

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user." });
  }
  const user = await userModel.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "No such user." });
  } 
  res.status(200).json(user);
};

//edit by user id

const editById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user." });
  }

  const user = await userModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!user) {
    return res.status(404).json({ error: "No such user." });
  }
  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  postUser,
  getUserById,
  deleteUserById,
  editById,
};
