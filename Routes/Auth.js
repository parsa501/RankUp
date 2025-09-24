/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints (login & register)
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with username and password. Returns a JWT token on success.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: StrongPass123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT authentication token
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         role:
 *                           type: string
 *                           enum: [user, admin]
 *       400:
 *         description: Missing username or password
 *       401:
 *         description: Invalid username or password
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user account with username and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: janedoe
 *               password:
 *                 type: string
 *                 description: Must be at least 8 chars, with uppercase, lowercase, and number
 *                 example: StrongPass123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Validation error (e.g., missing fields or weak password)
 */
import express from "express";
import { login, register } from "../Controllers/AuthCn.js";
import { loginValidation, registerValidation } from "../Middleware/validators/authValidator.js";
import handleValidation from "../Middleware/handleValidation.js";

const authRouter = express.Router();
authRouter.route("/").post(loginValidation, handleValidation, login);
authRouter
  .route("/register")
  .post(registerValidation, handleValidation, register);
export default authRouter;
