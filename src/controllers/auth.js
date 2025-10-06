import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/users.js";
import httpError from "../services/httpError.js";
import ctrlWrapper from "../services/ctrlWrapper.js";

const { JWT_SECRET } = process.env;
const SECRET_KEY = JWT_SECRET || '719cfbca0dab365784e4d8e81e45ab1e0b92aefd70842cd1fc7b55d1e8cb1f6580107a3ff6d8699ef206a5bf3d67cc2d203cbd11950fb30c1796ce641ea4825a';

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (user) {
      throw httpError(409, "Email in use");
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    if (error.name === 'MongoServerError' || error.name === 'MongooseError') {
      throw httpError(500, "Database connection error. Please check MongoDB connection.");
    }
    throw error;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcryptjs.compare(password, user.password);

  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token }, { new: true });

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

const getUserInfo = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  res.json({
    user: {
      name: user.name,
      email,
    },
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getUserInfo: ctrlWrapper(getUserInfo),
};