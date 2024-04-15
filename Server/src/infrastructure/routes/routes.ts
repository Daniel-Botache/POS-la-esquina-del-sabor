import { Router } from "express";
import { clientRoutes } from "./clientRoutes";

const router = Router();

router.use("/client", clientRoutes);

export const routes = router;
