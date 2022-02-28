import { CustomError } from "./customError";

export class NotAuthorized extends CustomError {
  statusCode: number = 401;

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }
  serializerErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not authorized" }];
  }
}
