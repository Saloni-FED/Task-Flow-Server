import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username : {
    type: String,
    default : " "
  },
  bio :{
    type: String,
    default:" "
  },
  image : {
   type:String,
   default : " "
  }
});



const Users = mongoose.model("Users", userSchema);

export default Users;
