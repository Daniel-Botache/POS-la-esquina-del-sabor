import { Router } from "express";
import { BaleController } from "../webserver/BaleController";

const router = Router();
const controller = new BaleController();
router.get("/:id", controller.getDataById);
router.get("/", controller.getAllData);
router.get("/search/:barcode", controller.findProductByBarcode);
router.post("/", controller.createData);
router.put("/:id", controller.putData);
router.delete("/:id", controller.deleteData);

export const baleRoutes = router;
