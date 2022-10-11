class APIError {
  public code: number;
  public message: string;
  public error: Error;
  public extra: Extra;

  constructor(code: number, message: string, error: Error = undefined, extra: Extra = {}) {
    this.code = code;
    this.message = message;
    this.error = error;
    this.extra = extra;
  }
}

type Extra = {
  [key: string]: unknown;
};

export { APIError };
