const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({
  origin:["http://localhost:4500/users", "https://contact-app.onrender.com"]
}));
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

if (process.env.NODE_ENV === "production") {
  //set static
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else if (process.env.NODE_ENV === "development") {
  const feProxy = proxy("http://localhost:3000", {
    proxyReqPathResolver: (req) => url.parse(req.originalUrl).path || "",
  });
  app.use("/*", feProxy);
}

app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
