import { body, param } from "express-validator";
import { errorValidator } from "../../middlewares/validate";

const userIdParam = [
    param("id").isUUID("4").withMessage("id must be uuid v4"),
    errorValidator
];

const register = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isString().isLength({ min: 6, max: 128 }).withMessage("Password min 6 chars"),
    errorValidator
];

const login = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isString().notEmpty().withMessage("Password is required"),
    errorValidator
];

export default { userIdParam, register, login };