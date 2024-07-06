import { Router } from "express";

import { BaseController } from "../webserver/BaseController";

const router = Router();
const controller = new BaseController();

router.get("/", controller.getAllData);
router.get("/:id", controller.getDataById);
router.get("/baseToday", controller.findBaseDateNow);
router.post("/baseDate", controller.findSBaseByDate);
router.post("/", controller.createData);
router.put("/:id", controller.putData);
router.delete("/:id", controller.deleteData);

export const baseRoutes = router;
