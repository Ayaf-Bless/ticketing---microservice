import express from "express";

const router = express.Router();

router.post("/api/users/signOut", (req, res) => {
  res.send("Hello");
});

export { router as signOut };
