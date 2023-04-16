import { ValueError } from "./value-errors.ts";

export interface ErrorOptions {
  readonly name: string;
  readonly message: string;
  readonly stack?: string;
  readonly cause?: unknown;
}

/**
 * A lightweight extension of the standard {@linkcode Error} class with some static helper functions added.
 */
export class QuackError extends Error {
  static fromUnknown(val: unknown) {
    if (val instanceof Error) {
      return QuackError.fromError(val);
    } else if (typeof val === "string") {
      return new QuackError(val);
    } else {
      return new QuackError(JSON.stringify(val));
    }
  }

  static fromError(err: Error) {
    if (err instanceof QuackError) {
      return err;
    } else {
      return new QuackError({ cause: err, message: err.message, name: err.name });
    }
  }

  static fromResponse(response: Response) {
    if (response.ok) {
      throw new QuackError("Cannot create a new error from a response that is OK!");
    }
    return new QuackError({
      cause: response,
      message: response.statusText,
      name: `Response Error: [${response.status}]`,
    });
  }

  static fromValueErrors(errors: ValueError[] | IterableIterator<ValueError>) {
    const errorString = JSON.stringify([...errors]);
    return new QuackError(errorString);
  }

  constructor(options: string | ErrorOptions) {
    const message = typeof options === "string" ? options : options.message;
    super(message);

    if (typeof options !== "string") {
      this.cause = options.cause;
      this.stack = options.stack;
      this.name = options.name;
      this.message = message;
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
    };
  }
}
