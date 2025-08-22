import { Request, Response } from "express";
import { GetQuizzesService } from "../../services/quizzes/get-quizzes.service";

export class GetQuizzesController {
  static async handle(req: Request, res: Response) {
    try {
      const quizzes = await GetQuizzesService.execute();
      return res.json(quizzes);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
