import { Request, NextFunction, Response } from "express";
import { RequestValidationError } from "../errors/requestValidationError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formattedError = err.errors.map((error) => {
      return { message: error.msg, fields: error.param };
    });
    return res.status(400).json({ errors: formattedError });
  }

  return res
    .status(400)
    .json({ errors: [{ message: "something went wrong" }] });
};
