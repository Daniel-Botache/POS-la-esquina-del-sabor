import { Router } from "express";
import { clientRoutes } from "./clientRoutes";
import { baseRoutes } from "./baseRoutes";
import { userRoutes } from "./userRoutes";
import { saleRoutes } from "./saleRoutes";
import { productRoutes } from "./productRoutes";
import { suplierRoutes } from "./suplierRoutes";
import { baleRoutes } from "./baleRoutes";
import { typeRoutes } from "./typeRoutes";
import { expenseRoutes } from "./expenseRoutes";

const router = Router();

router.use("/client", clientRoutes);
router.use("/base", baseRoutes);
router.use("/user", userRoutes);
router.use("/sale", saleRoutes);
router.use("/product", productRoutes);
router.use("/suplier", suplierRoutes);
router.use("/bale", baleRoutes);
router.use("/type", typeRoutes);
router.use("/expense", expenseRoutes);

export const routes = router;
