import express, { Response, Request } from "express";
import { body } from "express-validator";
import { User } from "../models/userModel";
import { BadRequestError } from "../errors/badRequestError";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validateRequest";

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("email already in use");
    }

    const user = User.build({ email, password });

    await user.save();

    //Generate JWToken
    // @ts-ignore
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    // storing to the session
    req.session = {
      jwt: userJWT,
    };
    return res.status(201).json({ user });
  }
);

export { router as signUp };
