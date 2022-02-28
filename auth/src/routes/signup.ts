import express, { Response, Request } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { body, validationResult } from "express-validator";
import { User } from "../models/userModel";
import { BadRequestError } from "../errors/badRequestError";
import jwt from "jsonwebtoken";

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
      throw new BadRequestError("email already in use");
    }

    const user = User.build({ email, password });

    await user.save();

    //Generate JWToken
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "My very private secret"
    );
    // storing to the session
    req.session = {
      jwt: userJWT,
    };
    return res.status(201).json({ user });
  }
);

export { router as signUp };
