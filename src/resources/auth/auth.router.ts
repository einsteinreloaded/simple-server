import { Router } from "express";
import controller from "./auth.controller";

const router = Router();

// /api/blog
router.route("/verify").get(controller.verifyToken);

export default router;
