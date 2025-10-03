import express from "express";
import ctrl from "../controllers/auth.js";
import validateBody from "../middlewares/validateBody.js";
import { schemas } from "../models/users.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post(
  "/user/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post("/user/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/user/logout", authenticate, ctrl.logout);

router.get("/user/user-info", authenticate, ctrl.getUserInfo);

export default router;