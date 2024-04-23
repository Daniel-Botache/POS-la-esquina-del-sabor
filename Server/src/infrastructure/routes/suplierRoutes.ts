import { Router } from "express";
import { SuplierController } from "../webserver/SuplierController";

const router = Router();
const controller = new SuplierController();

router.get("/", controller.getAllData);
router.get("/:id", controller.findSuplierById);
router.post("/", controller.createData);
router.put("/:id", controller.putData);
router.delete("/:id", controller.deleteData);

export const productRoutes = router;
