import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CreateQuizService } from "../../services/create-quiz";
import { useNavigate } from "react-router-dom";

const questionSchema = z.object({
  type: z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]),
  text: z.string().min(1, "Question text is required"),
  options: z.array(z.string()).optional(),
});

const createQuizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

type CreateQuizForm = z.infer<typeof createQuizSchema>;

export const CreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuizForm>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: "",
      questions: [{ type: "BOOLEAN", text: "", options: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data: CreateQuizForm) => {
    try {
      setLoading(true);
      await CreateQuizService.createQuiz(data.title, data.questions);
      alert("Quiz created successfully!");
      reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Create a New Quiz
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Quiz Title
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="Enter quiz title"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-4 text-gray-700">
              Questions
            </label>
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-gray-100 rounded-xl p-6 shadow-md relative transition transform"
                >
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-4 right-4 text-red-500 font-bold text-xl hover:text-red-600"
                    >
                      &times;
                    </button>
                  )}

                  <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">
                      Question Text
                    </label>
                    <input
                      type="text"
                      {...register(`questions.${index}.text` as const)}
                      placeholder="Enter question text"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.questions?.[index]?.text && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.questions[index]?.text?.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      {...register(`questions.${index}.type` as const)}
                      className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="BOOLEAN">Boolean</option>
                      <option value="INPUT">Input</option>
                      <option value="CHECKBOX">Checkbox</option>
                    </select>
                  </div>

                  {control._formValues.questions[index].type === "CHECKBOX" && (
                    <Controller
                      control={control}
                      name={`questions.${index}.options`}
                      render={({ field }) => (
                        <div className="space-y-3">
                          <label className="block mb-1 font-medium text-gray-700">
                            Options
                          </label>
                          {(field.value || []).map(
                            (opt: string, optIndex: number) => (
                              <div
                                key={optIndex}
                                className="flex items-center space-x-3"
                              >
                                <input
                                  type="text"
                                  value={opt}
                                  placeholder={`Option ${optIndex + 1}`}
                                  onChange={(e) => {
                                    const newOptions = [...(field.value || [])];
                                    newOptions[optIndex] = e.target.value;
                                    field.onChange(newOptions);
                                  }}
                                  className="flex-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newOptions = [...(field.value || [])];
                                    newOptions.splice(optIndex, 1);
                                    field.onChange(newOptions);
                                  }}
                                  className="text-red-500 font-bold text-lg hover:text-red-600"
                                >
                                  &times;
                                </button>
                              </div>
                            )
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange([...(field.value || []), ""])
                            }
                            className="text-blue-600 font-semibold mt-2 hover:underline"
                          >
                            + Add Option
                          </button>
                        </div>
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => append({ type: "BOOLEAN", text: "", options: [] })}
              className="cursor-pointer mt-4 w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              + Add Question
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
          >
            {loading ? "Creating..." : "Create Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
};
