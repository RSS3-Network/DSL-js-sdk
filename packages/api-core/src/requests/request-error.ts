export class RequestError extends Error {
  constructor(
    public readonly path: string,
    public readonly data: unknown,
    public readonly error: unknown,
    public readonly response: Response,
  ) {
    super();
  }
}
