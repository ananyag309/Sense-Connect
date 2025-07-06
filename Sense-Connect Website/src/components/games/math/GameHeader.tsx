
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface GameHeaderProps {
  score: number;
  timer: number;
  questionsCount: number;
  currentQuestionIndex: number;
  onBackToMenu: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  timer,
  questionsCount,
  currentQuestionIndex,
  onBackToMenu
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={onBackToMenu}
        >
          Back to Menu
        </Button>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Score: {score}/{questionsCount}</span>
          <span>|</span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" /> {timer}s
          </span>
        </div>
      </div>
      
      <div className="text-sm font-medium">
        Question {currentQuestionIndex + 1} of {questionsCount}
      </div>
    </div>
  );
};

export default GameHeader;
