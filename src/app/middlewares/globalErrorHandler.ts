import { NextFunction, Request, Response } from "express";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleZodError from "../errors/handleZodError";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // default values
  let statusCode = 500;
  let message = err.message || "Something went wrong";
  type TErrorSource = {
    path: string | number;
    message: string;
  }[];
  let errorMessage =
    err?.errorMessage ||
    "Something went wrong in te server when validation or Retrieve!";
  let errorDetails: unknown = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simpleError = handleZodError(err);
    statusCode = simpleError.statusCode;
    message = simpleError.message;
    errorMessage = simpleError.errorMessage;
    errorDetails = simpleError?.errorDetails;
  } else if (err?.name === "CastError") {
    const simpleError = handleCastError(err);
    statusCode = simpleError?.statusCode;
    message = simpleError?.message;
    errorMessage = simpleError.errorMessage;
    errorDetails = simpleError?.errorDetails;
  } else if (err?.name === "ValidationError") {
    const simpleError = handleValidationError(err);
    statusCode = simpleError.statusCode;
    message = simpleError.message;
    errorMessage = simpleError.errorMessage;
    errorDetails = simpleError.errorDetails;
  } else if (err?.code === 11000) {
    const simpleError = handleDuplicateError(err);
    statusCode = simpleError?.statusCode;
    message = simpleError?.message;
    errorMessage = simpleError.errorMessage;
    errorDetails = simpleError?.errorDetails;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
