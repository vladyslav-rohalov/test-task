import { Router } from "express";
import { auth } from "../../middlewares/auth";
import schema from "./project.schema";
import controller from "./project.controller";

const router = Router();
router.use(auth);

router.get("/", controller.list);

router.post("/", schema.createProject, controller.add);

router.post("/:id/refresh", schema.projectIdParam, controller.refresh);

router.delete("/:id", schema.projectIdParam, controller.remove);

export default router;
