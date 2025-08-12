export class AppError extends Error {
  status: number;
  code?: string;
  details?: unknown;
  expose: boolean;

  constructor(status: number, message: string, opts?: { code?: string; details?: unknown; expose?: boolean }) {
    super(message);
    this.status = status;
    this.code = opts?.code;
    this.details = opts?.details;
    this.expose = opts?.expose ?? status < 500;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", details?: unknown) { super(400, message, { code: "BAD_REQUEST", details }); }
}
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") { super(401, message, { code: "UNAUTHORIZED" }); }
}
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") { super(403, message, { code: "FORBIDDEN" }); }
}
export class NotFoundError extends AppError {
  constructor(message = "Not found") { super(404, message, { code: "NOT_FOUND" }); }
}
export class ConflictError extends AppError {
  constructor(message = "Conflict", details?: unknown) { super(409, message, { code: "CONFLICT", details }); }
}
export class TooManyRequestsError extends AppError {
  constructor(message = "Too Many Requests") { super(429, message, { code: "TOO_MANY_REQUESTS" }); }
}
export class InternalError extends AppError {
  constructor(message = "Internal Server Error", details?: unknown) { super(500, message, { code: "INTERNAL_ERROR", details }); }
}
