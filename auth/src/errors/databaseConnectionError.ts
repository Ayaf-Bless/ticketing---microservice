import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason: string = "error connection to the database";
  constructor() {
    super("Error connecting to the DB");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializerErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
