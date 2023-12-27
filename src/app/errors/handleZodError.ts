import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "./handleCastError";

const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const errors: TErrorSource = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });
  const errorMessage = errors.reduce(
    (acc, curr) => acc + `${curr.path} is required.`,
    ""
  );
  const errorDetails = error;
  return {
    statusCode,
    message: "Validation Error",
    errorMessage,
    errorDetails,
  };
};

export default handleZodError;
