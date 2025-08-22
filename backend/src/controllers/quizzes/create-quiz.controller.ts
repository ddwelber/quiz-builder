import { Request, Response } from "express";
import { CreateQuizService } from "../../services/quizzes/create-quiz.service";
import { CreateQuizSchema } from "../../schemas/create-quiz.schema";

export class CreateQuizController {
  static async handle(req: Request, res: Response) {
    try {
      const parsed = CreateQuizSchema.parse(req.body);

      const quiz = await CreateQuizService.execute(
        parsed.title,
        parsed.questions
      );

      return res.status(201).json(quiz);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
