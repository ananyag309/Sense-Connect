
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyLevel } from './types';
import { Calculator } from "lucide-react";

interface DifficultySelectorProps {
  onSelect: (difficulty: DifficultyLevel) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Math Adventures</h3>
        <p className="mb-6 text-center">Test your math skills! Choose a difficulty level:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline"
            className="p-6 h-auto flex flex-col items-center"
            onClick={() => onSelect('easy')}
          >
            <Calculator className="h-8 w-8 mb-2 text-green-500" />
            <span className="text-lg font-medium mb-1">Easy</span>
            <span className="text-sm text-muted-foreground text-center">
              Simple addition and subtraction with numbers 1-10
            </span>
          </Button>
          
          <Button 
            variant="outline"
            className="p-6 h-auto flex flex-col items-center"
            onClick={() => onSelect('medium')}
          >
            <Calculator className="h-8 w-8 mb-2 text-amber-500" />
            <span className="text-lg font-medium mb-1">Medium</span>
            <span className="text-sm text-muted-foreground text-center">
              Addition, subtraction, and multiplication with numbers 1-20
            </span>
          </Button>
          
          <Button 
            variant="outline"
            className="p-6 h-auto flex flex-col items-center"
            onClick={() => onSelect('hard')}
          >
            <Calculator className="h-8 w-8 mb-2 text-red-500" />
            <span className="text-lg font-medium mb-1">Hard</span>
            <span className="text-sm text-muted-foreground text-center">
              All operations including division with numbers up to 50
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DifficultySelector;
