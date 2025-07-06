
import { Question, DifficultyLevel } from './types';

export const generateMathQuestions = (difficulty: DifficultyLevel): Question[] => {
  const operations = ['+', '-', 'x', '÷'];
  const newQuestions: Question[] = [];
  
  for (let i = 0; i < 10; i++) {
    let num1, num2, operation, answer;
    
    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operation = operations[Math.floor(Math.random() * 2)]; // Only + and -
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operation = operations[Math.floor(Math.random() * 3)]; // +, -, and x
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * 25) + 5;
        operation = operations[Math.floor(Math.random() * 4)]; // All operations
        break;
    }
    
    // Make sure num1 > num2 for subtraction to avoid negative results
    if (operation === '-' && num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    
    // Make sure division results in whole numbers
    if (operation === '÷') {
      answer = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * answer;
    } else {
      // Calculate the answer based on the operation
      switch (operation) {
        case '+':
          answer = num1 + num2;
          break;
        case '-':
          answer = num1 - num2;
          break;
        case 'x':
          answer = num1 * num2;
          break;
        default:
          answer = 0;
      }
    }
    
    newQuestions.push({ num1, num2, operation, answer });
  }
  
  return newQuestions;
};

export const formatQuestion = (question: Question): string => {
  const { num1, num2, operation } = question;
  return `${num1} ${operation} ${num2} = ?`;
};
