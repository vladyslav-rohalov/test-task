import { Router } from "express";

import schema from "./auth.schema"
import controller from "./auth.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register", schema.register, controller.register);

router.post("/login",schema.login,controller.login);

router.get("/me", auth, controller.getMe);

export default router;
