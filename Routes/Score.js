/**
 * @swagger
 * tags:
 *   name: Score
 *   description: Score management endpoints
 */

/**
 * @swagger
 * /api/Score:
 *   get:
 *     summary: Get all scores
 *     description: |
 *       Retrieve a list of all scores with pagination and filtering.
 *     tags: [Score]
 *     responses:
 *       200:
 *         description: List of scores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Score'
 *   post:
 *     summary: Create a new score
 *     description: |
 *       Submit a score for a game. User must be logged in.
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - game
 *               - value
 *             properties:
 *               game:
 *                 type: string
 *                 description: Game ID
 *               value:
 *                 type: number
 *                 description: Score value
 *               metadata:
 *                 type: object
 *                 description: Optional additional data
 *     responses:
 *       201:
 *         description: Score created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/Score/{id}:
 *   get:
 *     summary: Get a single score
 *     description: |
 *       Retrieve a score by its ID.
 *     tags: [Score]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Score ID
 *     responses:
 *       200:
 *         description: Score object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Score'
 *       404:
 *         description: Score not found
 *   patch:
 *     summary: Update a score
 *     description: |
 *       Admin only: update score value or metadata.
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Score ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               metadata:
 *                 type: object
 *               isPublish:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Score updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Score'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Score not found
 *   delete:
 *     summary: Deactivate a score
 *     description: |
 *       Admin only: soft delete a score.
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Score ID
 *     responses:
 *       200:
 *         description: Score deactivated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Score not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Score:
 *       type: object
 *       required:
 *         - user
 *         - game
 *         - value
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *           description: User ID
 *         game:
 *           type: string
 *           description: Game ID
 *         value:
 *           type: number
 *         metadata:
 *           type: object
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../Controllers/ScoreCn.js";
import isLogin from "../Middleware/IsLogin.js";

import isAdmin from "../Middleware/IsAdmin.js";
import {
  createScoreValidation,
  updateScoreValidation,
} from "../Middleware/validators/validateScore.js";
import handleValidation from "../Middleware/handleValidation.js";

const scoreRouter = express.Router();

scoreRouter
  .route("/")
  .get(getAll)
  .post(isLogin, createScoreValidation, handleValidation, create);

scoreRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, updateScoreValidation, handleValidation, update)
  .delete(isAdmin, remove);

export default scoreRouter;
