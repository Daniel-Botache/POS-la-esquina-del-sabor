import { Router } from "express";
import { ProductController } from "../webserver/ProductController";

const router = Router();
const controller = new ProductController();

router.get("/", controller.findAllProducts);
router.get("/:id", controller.findProductById);
router.post("/", controller.createProduct);
router.put("/", controller.updateProduct);
router.delete("/:id", controller.deleteData);

export const productRoutes = router;
