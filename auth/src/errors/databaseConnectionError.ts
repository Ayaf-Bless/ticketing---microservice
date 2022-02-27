export class DatabaseConnectionError extends Error {
  statusCode = 500;
  reason: string = "error connection to the database";
  constructor() {
    super();

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
