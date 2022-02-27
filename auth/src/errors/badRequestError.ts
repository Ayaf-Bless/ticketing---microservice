import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializerErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
