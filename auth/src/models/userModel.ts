import mongoose from "mongoose";

interface UserAttrs {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
});

export const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = mongoose.model("User", userSchema);
