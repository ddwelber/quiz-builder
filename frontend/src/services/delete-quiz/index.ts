import { api } from "../../lib/api";

export const DeleteQuizService = {
  async deleteQuiz(id: number): Promise<{ message: string }> {
    const res = await api.delete(`/quizzes/${id}`);
    return res.data;
  },
};
