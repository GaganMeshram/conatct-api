const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  emailID: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
