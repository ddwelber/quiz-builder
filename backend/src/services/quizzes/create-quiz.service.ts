import { QuestionDTO } from "../../types/quizzes";
import { QuizRepository } from "../../repositories/quizzes/quiz.repository";

export class CreateQuizService {
  static async execute(title: string, questions: QuestionDTO[]) {
    const quiz = await QuizRepository.createQuiz(title, questions);
    return quiz;
  }
}
