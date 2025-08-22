import { QuizRepository } from "../../repositories/quizzes/quiz.repository";

export class GetQuizzesService {
  static async execute() {
    return await QuizRepository.getAllQuizzes();
  }
}
