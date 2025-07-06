
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Clock, RefreshCw, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";

interface WordSet {
  level: string;
  words: string[];
}

const wordSets: WordSet[] = [
  {
    level: "Beginner",
    words: ["cat", "dog", "run", "jump", "big", "small", "happy", "sad", "hot", "cold"]
  },
  {
    level: "Intermediate",
    words: ["airplane", "mountain", "planet", "chocolate", "elephant", "dinosaur", "favorite", "beautiful", "remember", "tomorrow"]
  },
  {
    level: "Advanced",
    words: ["necessary", "excellent", "congratulations", "enthusiasm", "vocabulary", "dictionary", "encyclopedia", "sophisticated", "convenient", "appreciate"]
  }
];

const SpellingGame = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [correctWords, setCorrectWords] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Initialize game
  const startGame = (level: string) => {
    const selectedWordSet = wordSets.find(set => set.level === level);
    if (selectedWordSet) {
      // Shuffle the words
      const shuffledWords = [...selectedWordSet.words].sort(() => Math.random() - 0.5);
      setCurrentWords(shuffledWords);
      setSelectedLevel(level);
      setCurrentWordIndex(0);
      setUserInput('');
      setCorrectWords(0);
      setShowResults(false);
      setTimer(0);
      setIsGameStarted(true);
      
      // Focus the input
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  // Setup timer when game starts
  useEffect(() => {
    let interval: number | undefined;
    
    if (isGameStarted && !showResults) {
      interval = window.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isGameStarted, showResults]);

  // Speak the current word using speech synthesis
  const speakWord = () => {
    if (!currentWords.length) return;
    
    const word = currentWords[currentWordIndex];
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.8; // Slightly slower for clarity
    speechSynthesis.speak(utterance);
  };

  // Check the word and move to next
  const checkWord = () => {
    const currentWord = currentWords[currentWordIndex];
    const isCorrect = userInput.trim().toLowerCase() === currentWord.toLowerCase();
    
    if (isCorrect) {
      setCorrectWords(prev => prev + 1);
      toast({
        description: t('correct'),
        variant: "default", // Changed from "success" to "default"
      });
    } else {
      toast({
        description: `${t('incorrect')}. ${t('theCorrectSpellingIs')}: ${currentWord}`,
        variant: "destructive",
      });
    }
    
    // Move to next word or show results
    if (currentWordIndex < currentWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setUserInput('');
      // Auto-speak the next word
      setTimeout(speakWord, 1000);
    } else {
      setShowResults(true);
    }
  };

  // Format time from seconds
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6">
      {!isGameStarted ? (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">{t('spellingBee')}</h3>
            <p className="mb-6 text-center">Test and improve your spelling skills. Choose a difficulty level:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {wordSets.map((set) => (
                <Button 
                  key={set.level}
                  variant="outline"
                  className="p-6 h-auto flex flex-col items-center"
                  onClick={() => startGame(set.level)}
                >
                  <Pencil className={`h-8 w-8 mb-2 ${
                    set.level === "Beginner" ? "text-green-500" :
                    set.level === "Intermediate" ? "text-amber-500" : "text-red-500"
                  }`} />
                  <span className="text-lg font-medium mb-1">{set.level}</span>
                  <span className="text-sm text-muted-foreground text-center">
                    {set.level === "Beginner" 
                      ? "Simple, common words" 
                      : set.level === "Intermediate"
                        ? "Moderately challenging words"
                        : "More complex vocabulary"}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setIsGameStarted(false)}
              >
                {t('backToMenu')}
              </Button>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Level: {selectedLevel}</span>
                <span>|</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> {formatTime(timer)}
                </span>
              </div>
            </div>
            
            <div className="text-sm font-medium">
              {t('word')} {currentWordIndex + 1} {t('of')} {currentWords.length}
            </div>
          </div>
          
          <Progress value={(currentWordIndex / currentWords.length) * 100} />
          
          {!showResults ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center mb-6">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="h-20 w-20 rounded-full"
                    onClick={speakWord}
                  >
                    <Volume2 className="h-10 w-10" />
                  </Button>
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Listen to the word and type it below:</p>
                  <Button variant="link" onClick={speakWord}>
                    Hear the word again
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type what you hear"
                    className="text-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') checkWord();
                    }}
                  />
                  
                  <Button 
                    onClick={checkWord}
                    disabled={!userInput.trim()}
                    className="flex-shrink-0"
                  >
                    {t('submit')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mt-6 bg-primary/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{t('gameOver')}</h3>
                <p className="text-2xl font-bold mb-4">
                  {t('yourScore')}: {correctWords}/{currentWords.length}
                </p>
                <p className="mb-4">
                  {correctWords === currentWords.length 
                    ? t('perfectScore') 
                    : `${t('youSpelled')} ${correctWords} ${t('outOf')} ${currentWords.length} ${t('wordsCorrectly')}`}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {t('timeTaken')}: {formatTime(timer)}
                </p>
                <div className="flex justify-center gap-3">
                  <Button 
                    onClick={() => {
                      startGame(selectedLevel!);
                    }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {t('playAgain')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsGameStarted(false)}
                  >
                    {t('changeLevel')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default SpellingGame;
