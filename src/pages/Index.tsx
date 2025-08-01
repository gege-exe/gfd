import { useState } from "react";
import QuestionPage from "@/components/QuestionPage";
import ThankYouPage from "@/components/ThankYouPage";
import GamesPage from "@/components/GamesPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'question' | 'thank-you' | 'games'>('question');

  const handleYes = () => {
    setCurrentPage('thank-you');
  };

  const handleBackToMain = () => {
    setCurrentPage('question');
  };

  const handleShowGames = () => {
    setCurrentPage('games');
  };

  const handleBackFromGames = () => {
    setCurrentPage('thank-you');
  };

  if (currentPage === 'thank-you') {
    return <ThankYouPage onBackToMain={handleBackToMain} onShowGames={handleShowGames} />;
  }

  if (currentPage === 'games') {
    return <GamesPage onBack={handleBackFromGames} />;
  }

  return <QuestionPage onYes={handleYes} />;
};

export default Index;