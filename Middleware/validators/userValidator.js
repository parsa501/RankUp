import { body, param } from "express-validator";

export const updateUserValidation = [
  body("username")
    .optional()
    .isString().withMessage("Username must be a string")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

  body("password")
    .optional()
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),

  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("Role must be either 'user' or 'admin'"),
];

export const idValidation = [
  param("id")
    .isMongoId().withMessage("Invalid user id"),
];
