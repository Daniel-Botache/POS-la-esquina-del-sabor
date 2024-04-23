import { Router } from "express";
import { clientRoutes } from "./clientRoutes";
import { baseRoutes } from "./baseRoutes";
import { creditRoutes } from "./creditRoutes";
import { userRoutes } from "./userRoutes";
import { saleRoutes } from "./saleRoutes";
import { productRoutes } from "./productRoutes";
import { suplierRoutes } from "./suplierRoutes";

const router = Router();

router.use("/client", clientRoutes);
router.use("/base", baseRoutes);
router.use("/credit", creditRoutes);
router.use("/user", userRoutes);
router.use("/sale", saleRoutes);
router.use("/product", productRoutes);
router.use("/suplier", suplierRoutes);

export const routes = router;
