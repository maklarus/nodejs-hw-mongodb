import createHttpError from 'http-errors';

export function notFoundHandler(req, res, next) {
  return createHttpError(404, 'Contact not found');
}
