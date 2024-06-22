import { Router } from "express";
import { SaleController } from "../webserver/SaleController";

const router = Router();
const controller = new SaleController();

router.get("/", controller.findAllSales);
router.post("/saleDate", controller.findSaleByDate);
router.get("/salesClient/:id", controller.findSaleByClientId);
router.get("/saleToday", controller.findSaleByDateNow);
router.get("/:id", controller.findSaleById);
router.post("/", controller.createSale);
router.delete("/:id", controller.deleteData);

export const saleRoutes = router;
