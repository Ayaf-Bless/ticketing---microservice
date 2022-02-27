import express, { Response, Request } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { body, validationResult } from "express-validator";
import { User } from "../models/userModel";

const router = express.Router();

router.post(
  "/api/users/signUp",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({});
    }
    const user = User.build({ email, password });
    await user.save();

    return res.status(201).json({ user });
  }
);

export { router as signUp };
