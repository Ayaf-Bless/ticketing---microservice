export class DatabaseConnectionError extends Error {
  reason: string = "error connection to the database";
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
