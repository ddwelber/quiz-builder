import { api } from "../../lib/api";
import type { Quiz } from "../../types/quiz";

export const GetQuizDetailsService = {
  async getQuizById(id: string): Promise<Quiz> {
    const res = await api.get(`/quizzes/${id}`);
    return res.data;
  },
};
