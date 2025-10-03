const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
    error.message = "Email in use";
  } else {
    error.status = 400;
    error.message = "Validation error";
  }
  next();
};

export default handleMongooseError;
