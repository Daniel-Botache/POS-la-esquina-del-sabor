import { Router } from "express";
import { clientRoutes } from "./clientRoutes";
import { baseRoutes } from "./baseRoutes";
import { creditRoutes } from "./creditRoutes";
import { userRoutes } from "./userRoutes";
import { saleRoutes } from "./saleRoutes";
import { productRoutes } from "./productRoutes";

const router = Router();

router.use("/client", clientRoutes);
router.use("/base", baseRoutes);
router.use("/credit", creditRoutes);
router.use("/user", userRoutes);
router.use("/sale", saleRoutes);
router.use("/product", productRoutes);

export const routes = router;
