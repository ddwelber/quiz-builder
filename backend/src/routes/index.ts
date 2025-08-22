import { Router } from "express";
import quizRoutes from "./quiz";

const router = Router();

router.use("/quizzes", quizRoutes);

export default router;
