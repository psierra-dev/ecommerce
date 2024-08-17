
import { Request, Response, NextFunction } from "express"
import { ValidationError } from "sequelize";

export function logErrors(err, req: Request, res: Response, next: NextFunction) {
  console.log('errorLog');
  
  next(err);
}

export function errorServer(err, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

export function boomErrorHandler(err, req: Request, res: Response, next: NextFunction) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
    return;
  }
  next(err);
}

export function ormErrorHandler(err, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
    return;
  }
  next(err);
}

