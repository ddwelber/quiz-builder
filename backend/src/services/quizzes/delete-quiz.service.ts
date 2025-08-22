import { QuizRepository } from "../../repositories/quizzes/quiz.repository";

export class DeleteQuizService {
  static async execute(id: string) {
    const quiz = await QuizRepository.getQuizById(id);

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    await QuizRepository.deleteQuiz(id);

    return { message: "Quiz deleted successfully" };
  }
}
