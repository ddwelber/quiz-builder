import { QuestionType } from "../../generated/prisma";
import { prisma } from "../../lib/prisma";

export class QuizRepository {
  static async createQuiz(
    title: string,
    questions: { type: QuestionType; text: string; options?: string[] }[]
  ) {
    return prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q) => ({
            type: q.type,
            text: q.text,
            options: q.options || [],
          })),
        },
      },
      include: { questions: true },
    });
  }
}
