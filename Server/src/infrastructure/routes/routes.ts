import { Router } from "express";
import { clientRoutes } from "./clientRoutes";
import { baseRoutes } from "./baseRoutes";
import { creditRoutes } from "./creditRoutes";
import { userRoutes } from "./userRoutes";

const router = Router();

router.use("/client", clientRoutes);
router.use("/base", baseRoutes);
router.use("/credit", creditRoutes);
router.use("/user", userRoutes);

export const routes = router;
