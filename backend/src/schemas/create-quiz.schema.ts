import { z } from "zod";

export const QuestionSchema = z
  .object({
    type: z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]),
    text: z.string().min(1, "Question text is required"),
    options: z.array(z.string()).optional(),
  })
  .superRefine((question, ctx) => {
    if (question.type === "CHECKBOX") {
      if (!question.options || question.options.length < 2) {
        ctx.addIssue({
          path: ["options"],
          message: "CHECKBOX questions must have at least 2 options",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const CreateQuizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  questions: z
    .array(QuestionSchema)
    .min(1, "Quiz must have at least one question"),
});

export type CreateQuizInput = z.infer<typeof CreateQuizSchema>;
