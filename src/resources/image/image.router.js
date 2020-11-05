import { Router } from "express";
import controller from "./image.controller";

const router = Router();

// /api/blog
router.route("/").post(controller.createOne).get(controller.getAll);

export default router;
