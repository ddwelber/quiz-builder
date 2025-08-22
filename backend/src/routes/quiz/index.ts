import { Router } from "express";
import { CreateQuizController } from "../../controllers/quizzes/create-quiz.controller";
import { GetQuizzesController } from "../../controllers/quizzes/get-quizzes.controller";
import { GetQuizDetailsController } from "../../controllers/quizzes/get-quiz-details.controller";

const router = Router();

router.post("/", CreateQuizController.handle);
router.get("/", GetQuizzesController.handle);
router.get("/:id", GetQuizDetailsController.handle);

export default router;
