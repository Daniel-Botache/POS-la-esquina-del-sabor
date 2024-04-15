import { Router } from "express";
import { clientRoutes } from "./clientRoutes";
import { baseRoutes } from "./baseRoutes";
import { creditRoutes } from "./creditRoutes";

const router = Router();

router.use("/client", clientRoutes);
router.use("/base", baseRoutes);
router.use("/credit", creditRoutes);

export const routes = router;
