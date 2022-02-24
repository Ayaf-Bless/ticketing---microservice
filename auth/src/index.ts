import express, { json } from "express";

const app = express();
app.use(json);

app.listen(3000, () => {
  console.log("auth service listening on port 30000 !!!");
});
