import express from "express";
import "express-async-errors";
import { json } from "body-parser";
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

export { app };
