import express from "express";

const router = express.Router();

router.post("/api/users/signIn", (req, res) => {
  res.send("Hello");
});

export { router as signIn };
