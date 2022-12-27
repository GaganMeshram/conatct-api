const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors())
const mongoose = require("mongoose");
const userModel = require("./model/Users.js");
const env = require("dotenv");
env.config();
const path = require("path");

const db = process.env.DB_KEY;

mongoose
  .connect(db)
  .then(() => console.log("connection to MongoDB successful."))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4500;

app.use("/users", require("./routes/Users"));
// app.use("/createUser", require('./routes/Users'));



app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
