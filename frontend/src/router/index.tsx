import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { CreateQuiz } from "../pages/create-quiz";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quizzes/create" element={<CreateQuiz />} />
    </Routes>
  );
};
