import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  isLibrarian: {
    type: Boolean,
    default: false,
  },
  password: {
    required: true,
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
