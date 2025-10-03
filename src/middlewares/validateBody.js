import httpError from "../services/httpError.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
      return;
    }
    next();
  };
  return func;
};

export default validateBody;
