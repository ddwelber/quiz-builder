import { Link } from "react-router-dom";

interface QuizCardProps {
  id: string;
  title: string;
  questionCount: number;
  onDelete: (id: string) => void;
}

export const QuizCard = ({
  id,
  title,
  questionCount,
  onDelete,
}: QuizCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between">
    <div className="mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
      <p className="text-gray-600">{questionCount} questions</p>
    </div>

    <div className="flex justify-between items-center">
      <Link
        to={`/quizzes/${id}`}
        className="text-blue-600 font-semibold hover:underline"
      >
        View Details
      </Link>
      <button
        onClick={() => onDelete(id)}
        className="cursor-pointer text-red-500 font-bold hover:text-red-600"
      >
        Delete
      </button>
    </div>
  </div>
);
