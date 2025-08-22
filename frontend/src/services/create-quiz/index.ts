import { api } from "../../lib/api";
import type { Question, Quiz } from "../../types/quiz";

export const CreateQuizService = {
  async createQuiz(title: string, questions: Question[]): Promise<Quiz> {
    const res = await api.post("/quizzes", { title, questions });
    return res.data;
  },
};
