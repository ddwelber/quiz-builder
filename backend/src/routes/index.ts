import { Router } from "express";
import quizRoutes from "./quiz";

const router = Router();

router.use("/quiz", quizRoutes);

export default router;
