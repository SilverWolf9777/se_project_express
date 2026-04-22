const BAD_REQUEST = 400;
const AUTHORIZATION_REQUIRED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const ALREADY_EXISTS = 409;
const SERVER_ERROR = 500;

class AppError extends Error {
  constructor(message, statusCode = SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
  }
}

const BadRequestError = (msg) => new AppError(msg, BAD_REQUEST);
const UnauthorizedError = (msg) => new AppError(msg, AUTHORIZATION_REQUIRED);
const ForbiddenError = (msg) => new AppError(msg, FORBIDDEN);
const NotFoundError = (msg) => new AppError(msg, NOT_FOUND);
const ConflictError = (msg) => new AppError(msg, ALREADY_EXISTS);

module.exports = {
  BAD_REQUEST,
  AUTHORIZATION_REQUIRED,
  FORBIDDEN,
  NOT_FOUND,
  ALREADY_EXISTS,
  SERVER_ERROR,
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
