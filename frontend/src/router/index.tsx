import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { CreateQuiz } from "../pages/create-quiz";
import { QuizDetails } from "../pages/quiz-details";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quizzes/create" element={<CreateQuiz />} />
      <Route path="/quizzes/:id" element={<QuizDetails />} />
    </Routes>
  );
};
