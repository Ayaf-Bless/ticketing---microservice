import express from "express";
import { json } from "body-parser";
//Routes
import { me } from "./routes/me";
import { signIn } from "./routes/signin";
import { signUp } from "./routes/signup";
import { signOut } from "./routes/signout";

// Error
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(json());

app.use(me);
app.use(signIn);
app.use(signOut);
app.use(signUp);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
