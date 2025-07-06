
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Question } from './types';
import { formatQuestion } from './utils';

interface GameInterfaceProps {
  questions: Question[];
  currentQuestionIndex: number;
  timer: number;
  score: number;
  isGameOver: boolean;
  onSubmitAnswer: (answer: string) => void;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({
  questions,
  currentQuestionIndex,
  timer,
  score,
  isGameOver,
  onSubmitAnswer,
  onPlayAgain,
  onChangeDifficulty
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      onSubmitAnswer(userAnswer);
      setUserAnswer('');
    }
  };
  
  if (isGameOver) {
    return (
      <Card className="mt-6 bg-primary/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Game Over!</h3>
          <p className="text-2xl font-bold mb-4">Your Score: {score}/{questions.length}</p>
          <p className="mb-6">
            {score === questions.length 
              ? 'Perfect score! You\'re a math genius!' 
              : `You got ${score} out of ${questions.length} questions correct!`}
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={onPlayAgain}>Play Again</Button>
            <Button variant="outline" onClick={onChangeDifficulty}>Change Difficulty</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!questions.length || currentQuestionIndex >= questions.length) {
    return <div>Loading questions...</div>;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">
            {formatQuestion(currentQuestion)}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="text-lg"
            autoFocus
          />
          
          <Button 
            type="submit"
            disabled={!userAnswer.trim()}
            className="flex-shrink-0"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GameInterface;
