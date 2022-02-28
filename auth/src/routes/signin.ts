import express, { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
  }
);

export { router as signIn };
