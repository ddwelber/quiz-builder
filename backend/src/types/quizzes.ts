import { QuestionType } from "../generated/prisma";

export interface QuestionDTO {
  type: QuestionType;
  text: string;
  options?: string[];
}

export interface CreateQuizDTO {
  title: string;
  questions: QuestionDTO[];
}
