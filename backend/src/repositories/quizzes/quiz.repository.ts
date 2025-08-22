import { prisma } from "../../lib/prisma";
import { QuestionDTO } from "../../types/quizzes";

export class QuizRepository {
  static async createQuiz(title: string, questions: QuestionDTO[]) {
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
      include: {
        questions: true,
      },
    });
  }

  static async getAllQuizzes() {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
    }));
  }

  static async getQuizById(id: string) {
    return prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });
  }

  static async deleteQuiz(id: string) {
    await prisma.question.deleteMany({
      where: { quizId: id },
    });

    return prisma.quiz.delete({
      where: { id },
    });
  }
}
