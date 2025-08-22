import { Request, Response } from "express";
import { GetQuizDetailsService } from "../../services/quizzes/get-quiz-details.service";

export class GetQuizDetailsController {
  static async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ error: "Invalid quiz ID" });
      }

      const quiz = await GetQuizDetailsService.execute(id);
      return res.json(quiz);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
