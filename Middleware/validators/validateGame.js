import { body, param } from "express-validator";

export const createGameValidation = [
  body("name")
    .exists().withMessage("Game name is required")
    .isString().withMessage("Game name must be a string")
    .isLength({ max: 128 }).withMessage("Game name is too long"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string"),

  body("metadata")
    .optional()
    .isObject().withMessage("Metadata must be an object"),

  body("metadata.modes")
    .optional()
    .isArray().withMessage("Modes must be an array of strings"),

  body("metadata.maxPlayers")
    .optional()
    .isInt({ min: 1 }).withMessage("maxPlayers must be a positive integer"),

  body("metadata.timeLimitSec")
    .optional()
    .isInt({ min: 0 }).withMessage("timeLimitSec must be a non-negative integer"),

  body("metadata.iconUrl")
    .optional()
    .isString().withMessage("iconUrl must be a string"),
];

export const updateGameValidation = [
  param("id").isMongoId().withMessage("Invalid game id"),
  ...createGameValidation.map((rule) => rule.optional()) // همه فیلدها اختیاری برای update
];
