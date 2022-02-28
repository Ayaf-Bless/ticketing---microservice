import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/currentUser";

const router = express.Router();

router.get("/api/users/me", currentUser, (req, res) => {
  return res.json({ user: req.currentUser || null });
});

export { router as me };
