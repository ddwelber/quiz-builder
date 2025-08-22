import { QuizRepository } from "../../repositories/quizzes/quiz.repository";

export class GetQuizDetailsService {
  static async execute(id: string) {
    const quiz = await QuizRepository.getQuizById(id);

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    return quiz;
  }
}
