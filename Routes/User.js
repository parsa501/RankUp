/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users. Only accessible to admins.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Fields to sort by (comma separated, prefix with - for descending)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields (comma separated)
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden (only admins can access this route)
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a single user
 *     description: Retrieve a single user by ID. Admins can view any user, while normal users can only view their own.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden (not allowed to access other users’ data)
 *       404:
 *         description: User not found
 *
 *   patch:
 *     summary: Update a user
 *     description: Update user data by ID. Admins can update any user. Normal users can only update their own account.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden (not authorized to update this user)
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated user ID
 *         username:
 *           type: string
 *           description: Unique username
 *         password:
 *           type: string
 *           description: Hashed user password
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 64b8f21c3d7a9e00234f9bcd
 *         username: johndoe
 *         password: $2a$10$hashedPasswordHere
 *         role: user
 *         createdAt: 2023-07-20T10:45:32.123Z
 *         updatedAt: 2023-07-20T10:45:32.123Z
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

import express from 'express';
import isAdmin from '../Middleware/IsAdmin.js';
import isLogin from '../Middleware/IsLogin.js';
import { getAll, getOne, update } from '../Controllers/UserCn.js';
import { updateUserValidation, idValidation } from '../Middleware/validators/userValidator.js';
import handleValidation from '../Middleware/handleValidation.js';

const userRouter = express.Router();

userRouter.route('/')
  .get(isAdmin, getAll);

userRouter.route('/:id')
  .get(isLogin, idValidation, handleValidation, getOne)
  .patch(isLogin, idValidation, updateUserValidation, handleValidation, update);

export default userRouter;
