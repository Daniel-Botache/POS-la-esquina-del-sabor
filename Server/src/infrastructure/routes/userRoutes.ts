import { Router } from "express";
import { UserController } from "../webserver/UserController";

const router = Router();
const controller = new UserController();

router.get("/", controller.getAllData);
router.get("/:id", controller.getDataById);
router.post("/", controller.createUserData);
router.put("/:id", controller.putData);
router.delete("/:id", controller.deleteData);
router.post("/login", controller.login);

export const userRoutes = router;
