import { Request, Response } from "express";
import { DeleteQuizService } from "../../services/quizzes/delete-quiz.service";

export class DeleteQuizController {
  static async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ error: "Invalid quiz ID" });
      }

      const result = await DeleteQuizService.execute(id);
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
