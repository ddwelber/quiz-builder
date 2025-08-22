import { Router } from "express";
import { CreateQuizController } from "../../controllers/quizzes/create-quiz.controller";

const router = Router();

router.post("/create", CreateQuizController.handle);

export default router;
