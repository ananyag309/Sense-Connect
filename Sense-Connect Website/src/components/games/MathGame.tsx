
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { DifficultyLevel, Question } from './math/types';
import { generateMathQuestions } from './math/utils';
import DifficultySelector from './math/DifficultySelector';
import GameInterface from './math/GameInterface';
import GameHeader from './math/GameHeader';
import { useLanguage } from "@/context/LanguageContext";

const MathGame = () => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Initialize game
  const startGame = (selectedDifficulty: DifficultyLevel) => {
    setDifficulty(selectedDifficulty);
    setIsGameStarted(true);
    setIsGameOver(false);
    const newQuestions = generateMathQuestions(selectedDifficulty);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(60);
  };

  // Setup timer when game starts
  useEffect(() => {
    let interval: number | undefined;
    
    if (isGameStarted && !isGameOver) {
      interval = window.setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsGameOver(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isGameStarted, isGameOver]);

  // Handle answer submission
  const handleSubmit = (userAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        description: t('correct'),
        variant: "default",
      });
    } else {
      toast({
        description: `${t('incorrect')}. ${t('theAnswerWas')} ${currentQuestion.answer}`,
        variant: "destructive",
      });
    }
    
    // Move to next question or end game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handlePlayAgain = () => {
    const newQuestions = generateMathQuestions(difficulty);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(60);
    setIsGameOver(false);
  };

  return (
    <div className="space-y-6">
      {!isGameStarted ? (
        <DifficultySelector onSelect={startGame} />
      ) : (
        <>
          <GameHeader
            score={score}
            timer={timer}
            questionsCount={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            onBackToMenu={() => setIsGameStarted(false)}
          />
          
          <GameInterface
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            timer={timer}
            score={score}
            isGameOver={isGameOver}
            onSubmitAnswer={handleSubmit}
            onPlayAgain={handlePlayAgain}
            onChangeDifficulty={() => setIsGameStarted(false)}
          />
        </>
      )}
    </div>
  );
};

export default MathGame;
