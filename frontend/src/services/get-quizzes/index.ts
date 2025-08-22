import { api } from "../../lib/api";

export const GetQuizzesService = {
  async getQuizzes(): Promise<
    { id: number; title: string; questionCount: number }[]
  > {
    const res = await api.get("/quizzes");
    return res.data;
  },
};
