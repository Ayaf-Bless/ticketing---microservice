import { Request, NextFunction, Response } from "express";
import { RequestValidationError } from "../errors/requestValidationError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json({ errors: err.serializerErrors() });
  }

  return res
    .status(400)
    .json({ errors: [{ message: "something went wrong" }] });
};
