import { Router } from "express";
import { CreateQuizController } from "../../controllers/quizzes/create-quiz.controller";
import { GetQuizzesController } from "../../controllers/quizzes/get-quizzes.controller";

const router = Router();

router.post("/", CreateQuizController.handle);
router.get("/", GetQuizzesController.handle);

export default router;
