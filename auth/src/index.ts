import express from "express";
import { json } from "body-parser";
import { me } from "./routes/me";

const app = express();
app.use(json());

app.use(me);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
