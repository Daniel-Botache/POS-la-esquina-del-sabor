import { Router } from "express";
import { ExpenseController } from "../webserver/ExpenseController";

const router = Router();
const controller = new ExpenseController();

router.get("/", controller.getAllData);
router.post("/expenseDate", controller.findSaleByDate);
router.get("/expenseToday", controller.findSaleByDateNow);
router.get("/:id", controller.getDataById);
router.post("/", controller.createData);
router.delete("/:id", controller.deleteData);

export const expenseRoutes = router;
