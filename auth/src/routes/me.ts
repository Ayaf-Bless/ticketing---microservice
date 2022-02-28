import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/me", (req, res) => {
  if (!req.session?.jwt) {
    return res.json({ user: null });
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    return res.json({ user: payload });
  } catch (e) {
    return res.json({ user: null });
  }
});

export { router as me };
