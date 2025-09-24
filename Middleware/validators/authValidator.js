import { body } from "express-validator";

export const loginValidation = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isString().withMessage("Username must be string"),

  body("password")
    .notEmpty().withMessage("Password is required")
];

export const registerValidation = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number")
];
