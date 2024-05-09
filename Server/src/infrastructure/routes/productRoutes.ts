import { Router } from "express";
import { ProductController } from "../webserver/ProductController";

const router = Router();
const controller = new ProductController();

router.get("/search", controller.findProductByName);
router.get("/search/:barcode", controller.findProductByBarcode);
router.get("/", controller.findAllProducts);
router.get("/:id", controller.findProductById);
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteData);

export const productRoutes = router;
