import express from "express";
import { create, getAll, getOne, update, remove } from "../Controllers/GameCn.js";
import isAdmin from "../Middleware/IsAdmin.js";
import { createGameValidation, updateGameValidation } from "../Middleware/validators/validateGame.js";
import handleValidation from "../Middleware/handleValidation.js";

/**
 * @swagger
 * tags:
 *   name: Game
 *   description: "Game management endpoints"
 */

/**
 * @swagger
 * /api/game:
 *   get:
 *     summary: "Get all games"
 *     description: "Retrieve a list of all games."
 *     tags: [Game]
 *     responses:
 *       200:
 *         description: "List of games"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *   post:
 *     summary: "Create a new game"
 *     description: "Admin only: create a new game"
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My Game"
 *               description:
 *                 type: string
 *                 example: "Fun game"
 *               metadata:
 *                 type: object
 *                 properties:
 *                   modes:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["solo", "duo"]
 *                   maxPlayers:
 *                     type: number
 *                     example: 4
 *                   timeLimitSec:
 *                     type: number
 *                     example: 300
 *                   iconUrl:
 *                     type: string
 *                     example: "https://example.com/icon.png"
 *     responses:
 *       201:
 *         description: "Game created successfully"
 *       400:
 *         description: "Validation error"
 *       401:
 *         description: "Unauthorized"
 */

/**
 * @swagger
 * /api/game/{id}:
 *   get:
 *     summary: "Get a single game"
 *     description: "Retrieve a single game by ID."
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Game ID"
 *     responses:
 *       200:
 *         description: "Game object"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: "Game not found"
 *   patch:
 *     summary: "Update a game"
 *     description: "Admin only: update game by ID"
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Game ID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               metadata:
 *                 type: object
 *               isPublish:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: "Game updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       403:
 *         description: "Forbidden"
 *       404:
 *         description: "Game not found"
 *   delete:
 *     summary: "Deactivate a game"
 *     description: "Admin only: deactivate (soft delete) a game by ID"
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Game ID"
 *     responses:
 *       200:
 *         description: "Game deactivated successfully"
 *       403:
 *         description: "Forbidden"
 *       404:
 *         description: "Game not found"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         description:
 *           type: string
 *         metadata:
 *           type: object
 *           properties:
 *             modes:
 *               type: array
 *               items: { type: string }
 *             maxPlayers: { type: number }
 *             timeLimitSec: { type: number }
 *             iconUrl: { type: string }
 *         isPublish:
 *           type: boolean
 *         createdBy:
 *           type: string
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

const gameRouter = express.Router();
gameRouter.route("/").get(getAll).post(isAdmin,createGameValidation,handleValidation, create);
gameRouter.route("/:id").get(getOne).patch(isAdmin,updateGameValidation,handleValidation, update).delete(isAdmin, remove);

export default gameRouter;
