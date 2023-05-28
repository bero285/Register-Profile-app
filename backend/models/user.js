// import mongoose from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});

const User = mongoose.model("User", userSchema);

// export default User; z
module.exports = User;
