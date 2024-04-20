import { Router } from "express";
import { clientRoutes } from "./clientRoutes";
import { baseRoutes } from "./baseRoutes";
import { creditRoutes } from "./creditRoutes";
import { userRoutes } from "./userRoutes";
import { saleRoutes } from "./saleRoutes";

const router = Router();

router.use("/client", clientRoutes);
router.use("/base", baseRoutes);
router.use("/credit", creditRoutes);
router.use("/user", userRoutes);
router.use("/sale", saleRoutes);

export const routes = router;
