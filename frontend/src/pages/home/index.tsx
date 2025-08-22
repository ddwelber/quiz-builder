import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetQuizzesService } from "../../services/get-quizzes";
import { DeleteQuizService } from "../../services/delete-quiz";
import { QuizCard } from "../../components/QuizCard";

interface QuizSummary {
  id: string;
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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await DeleteQuizService.deleteQuiz(id);
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
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              questionCount={quiz.questionCount}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
