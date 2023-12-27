const handleDuplicateError = (err: { message: string }) => {
  const match = err?.message.match(/"([^"]*)"/);

  const extractedId = match && match[1];

  const errorMessage = `${extractedId}  is already exist`;

  const statusCode = 400;

  const errorDetails = {
    stringValue: `${extractedId}`,
    valueType: "string",
    kind: "ObjectId",
    value: extractedId,
    path: match && match[0],
    reason: {},
    name: "CastError",
    message: match?.input,
  };

  return {
    statusCode,
    message: "Invalid ID",
    errorMessage,
    errorDetails,
  };
};

export default handleDuplicateError;
