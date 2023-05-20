import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

userSchema.path("email").validate(async (email) => {
  const countEmail = await mongoose.models.User.count({ email });
  return !countEmail;
}, "Email already exists");

export const userModel = mongoose.model("User", userSchema);
