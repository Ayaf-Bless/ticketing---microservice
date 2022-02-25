import express from "express";

const router = express.Router();

router.get("/api/users/me", (req, res) => {
  res.send("Hello");
});

export { router as me };
