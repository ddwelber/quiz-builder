import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Quiz } from "../../types/quiz";
import { GetQuizDetailsService } from "../../services/get-quiz-details";

export const QuizDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await GetQuizDetailsService.getQuizById(id);
      setQuiz(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching quiz details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading quiz...</p>;
  }

  if (!quiz) {
    return <p className="text-center text-gray-500 mt-10">Quiz not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{quiz.title}</h1>
          <Link to="/" className="text-blue-500 font-semibold hover:underline">
            Back to Home
          </Link>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((question, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Question {idx + 1}
              </h2>
              <p className="text-gray-700 mb-2">{question.text}</p>
              <p className="text-gray-500 font-medium mb-2">
                Type: {question.type}
              </p>

              {question.type === "CHECKBOX" && question.options && (
                <ul className="list-disc list-inside text-gray-600">
                  {question.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
