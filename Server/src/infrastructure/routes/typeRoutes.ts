import { Router } from "express";
import { TypeController } from "../webserver/TypeController";

const router = Router();
const controller = new TypeController();

router.get("/", controller.getAllData);
router.get("/:id", controller.findSuplierById);
router.post("/", controller.createData);
router.put("/:id", controller.putData);
router.delete("/:id", controller.deleteData);

export const typeRoutes = router;
