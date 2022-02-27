import express from "express";

const router = express.Router();

router.post("/api/users/signIn", (req, res) => {
  res.send("hey");
});

export { router as signIn };
