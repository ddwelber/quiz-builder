export type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

export interface Question {
  type: QuestionType;
  text: string;
  options?: string[];
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  updatedAt?: string;
  questions: Question[];
}

export interface QuizSummary {
  id: number;
  title: string;
  questionCount: number;
}
