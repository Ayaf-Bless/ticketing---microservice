import { CustomError } from "./customError";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  constructor() {
    super("Route Not Found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializerErrors(): { message: string; field?: string }[] {
    return [
      {
        message: "Not found",
      },
    ];
  }
}
