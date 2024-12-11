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
  role: {
    type: String,
    enum: ["student", "librarian", "admin"],
    default: "student",
  },
  password: {
    required: true,
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
