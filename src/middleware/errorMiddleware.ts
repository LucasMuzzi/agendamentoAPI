import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  res.status(500).json({ message: "Algo deu errado", error: err.message });
};

export default errorMiddleware;
