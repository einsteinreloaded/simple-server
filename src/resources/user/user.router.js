import { Router } from "express";
import controller from "./user.controller";

const router = Router();

router.route("/").get(controller.getAll);

router.route("/signup").post(controller.createOne);

router.route("/signin").post(controller.signIn);

router.route("/forgotpassword").put(controller.updatePassword);

export default router;
