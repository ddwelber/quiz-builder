import { api } from "../../lib/api";

export const DeleteQuizService = {
  async deleteQuiz(id: string): Promise<{ message: string }> {
    const res = await api.delete(`/quizzes/${id}`);
    return res.data;
  },
};
