import { body, param } from "express-validator";

export const createScoreValidation = [
  body("game")
    .exists().withMessage("Game ID is required")
    .isMongoId().withMessage("Invalid Game ID"),

  body("value")
    .exists().withMessage("Score value is required")
    .isNumeric().withMessage("Score value must be a number"),

  body("metadata")
    .optional()
    .isObject().withMessage("Metadata must be an object"),
];

export const updateScoreValidation = [
  param("id").isMongoId().withMessage("Invalid score id"),
  body("value").optional().isNumeric().withMessage("Score value must be a number"),
  body("metadata").optional().isObject().withMessage("Metadata must be an object"),
  body("isPublish").optional().isBoolean().withMessage("isPublish must be boolean"),
];
