import express, { Response, Request } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import { User } from "../models/userModel";
import { BadRequestError } from "../errors/badRequestError";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signIn",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("The password must be between 4 and 10"),
    body("email").isEmail().withMessage("Email is invalid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { password, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("invalid your credentials");
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("invalid credentials");
    }
    //Generate JWToken
    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    // storing to the session
    req.session = {
      jwt: userJWT,
    };
    return res.status(201).json({ user: existingUser });
  }
);

export { router as signIn };
