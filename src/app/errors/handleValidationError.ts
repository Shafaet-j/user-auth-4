import { Error } from "mongoose";
import { TErrorSource } from "./handleCastError";

const handleValidationError = (error: Error.ValidationError) => {
  const statusCode = 400;
  const errorDetails: TErrorSource = Object.values(error?.errors).map(
    (value: Error.ValidatorError | Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );
  const errorMessage = errorDetails.reduce(
    (acc, curr) => acc + ` ${curr.path} is required.`,
    ""
  );
  return {
    statusCode,
    message: error?.message,
    errorMessage,
    errorDetails,
  };
};
export default handleValidationError;
