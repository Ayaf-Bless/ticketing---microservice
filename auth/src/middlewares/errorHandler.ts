import { Request, NextFunction, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Something went wrong", err);

  return res.status(400).json({ message: err.message });
};
