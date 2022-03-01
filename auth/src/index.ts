import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be define");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-svc:27017/auth");
    console.log("Connected to the DB");
  } catch (e) {
    console.log(e);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
