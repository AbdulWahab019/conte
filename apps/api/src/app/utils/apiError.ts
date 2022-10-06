class APIError {
  public code: number;
  public message: string;
  public error: Error;
  public extra;
  constructor(code, message, error, extra) {
    this.code = code;
    this.message = message;
    this.error = error;
    this.extra = extra;
  }
}

export { APIError };
