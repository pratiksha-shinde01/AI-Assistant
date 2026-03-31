import { Router } from "express";
import { register, verifyEmail , login,getMe } from "../controllers/auth.controller.js";
import { registerValidator ,loginValidator } from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 */
authRouter.post("/register", registerValidator, register);

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body { email, password }
 */
authRouter.post("/login", loginValidator, login)


/**
 * @route GET /api/auth/get-me
 * @desc to get  the current login user details
 * @access Private
 */
authRouter.get("/get-me",authUser, getMe)

/**
 * @route GET /api/auth/verify-email
 */
authRouter.get("/verify-email", verifyEmail);

export default authRouter;