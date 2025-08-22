import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Link } from "react-router-dom";
import { GetQuizzesService } from "../../services/get-quizzes";

interface QuizSummary {
  id: number;
  title: string;
  questionCount: number;
}

export const Home = () => {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await GetQuizzesService.getQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching quizzes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await api.delete(`/quizzes/${id}`);
      setQuizzes(quizzes.filter((q) => q.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting quiz");
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quizzes</h1>
        <Link
          to="/quizzes/create"
          className="bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          + Create Quiz
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes found.</p>
      ) : (
        <div className="space-y-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {quiz.title}
                </h2>
                <p className="text-gray-600">{quiz.questionCount} questions</p>
              </div>

              <div className="flex justify-between items-center">
                <Link
                  to={`/quizzes/${quiz.id}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="cursor-pointer text-red-500 font-bold hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
