import jwt from "jsonwebtoken";
import httpError from "../services/httpError.js";
import { User } from "../models/users.js";

const { JWT_SECRET } = process.env;

// Geçici çözüm: Eğer JWT_SECRET yoksa, default değer kullan
const SECRET_KEY = JWT_SECRET || '719cfbca0dab365784e4d8e81e45ab1e0b92aefd70842cd1fc7b55d1e8cb1f6580107a3ff6d8699ef206a5bf3d67cc2d203cbd11950fb30c1796ce641ea4825a';

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  console.log('=== AUTHENTICATE DEBUG ===');
  console.log('authorization:', authorization);
  console.log('bearer:', bearer);
  console.log('token:', token ? 'SET' : 'NOT SET');
  console.log('SECRET_KEY:', SECRET_KEY ? 'SET' : 'NOT SET');
  console.log('========================');

  if (bearer !== "Bearer") {
    throw httpError(401);
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(httpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(httpError(401));
  }
};

export default authenticate;