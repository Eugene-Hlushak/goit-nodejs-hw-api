const errorMessagesList = {
  400: "Bad Request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Email in use",
};

const HttpError = (status, message = errorMessagesList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = {
  HttpError,
};
