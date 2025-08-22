import { Router } from "express";
import { CreateQuizController } from "../../controllers/quizzes/create-quiz.controller";
import { GetQuizzesController } from "../../controllers/quizzes/get-quizzes.controller";
import { GetQuizDetailsController } from "../../controllers/quizzes/get-quiz-details.controller";
import { DeleteQuizController } from "../../controllers/quizzes/delete-quiz.controller";

const router = Router();

router.post("/", CreateQuizController.handle);
router.get("/", GetQuizzesController.handle);
router.get("/:id", GetQuizDetailsController.handle);
router.delete("/:id", DeleteQuizController.handle);

export default router;
