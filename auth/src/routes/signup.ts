import express from "express";

const router = express.Router();

router.post("/api/users/signUp", (req, res) => {
  res.send("Hello");
});

export { router as signUp };
