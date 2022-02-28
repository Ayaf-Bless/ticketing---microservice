import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
//Routes
import { me } from "./routes/me";
import { signIn } from "./routes/signin";
import { signUp } from "./routes/signup";
import { signOut } from "./routes/signout";

// Error
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(me);
app.use(signIn);
app.use(signOut);
app.use(signUp);

// Generic error handler
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
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
