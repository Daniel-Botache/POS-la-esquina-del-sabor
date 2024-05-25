import { Router } from "express";
import { DefaultController } from "../webserver/DefaultController";
import { sequelize } from "../config/database";

const router = Router();
const controller = new DefaultController(sequelize.models.Base);

router.get("/", controller.getAllData);
router.get("/:id", controller.getDataById);
router.post("/", controller.createData);
router.put("/:id", controller.putData);
router.delete("/:id", controller.deleteData);

export const baseRoutes = router;
