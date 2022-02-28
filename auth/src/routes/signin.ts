import express, { Response, Request } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

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
  (req: Request, res: Response) => {
    //
  }
);

export { router as signIn };
