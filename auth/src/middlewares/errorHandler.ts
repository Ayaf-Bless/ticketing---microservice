import { Request, NextFunction, Response } from "express";
import { CustomError } from "../errors/customError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializerErrors() });
  }

  return res
    .status(400)
    .json({ errors: [{ message: "something went wrong" }] });
};
