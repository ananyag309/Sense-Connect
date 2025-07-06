
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shuffle, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐸", "🐵"];

const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Initialize game
  const initializeGame = () => {
    // Double the emojis to create pairs and shuffle
    const cardEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    const newCards = cardEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimer(0);
    setIsGameStarted(true);
    setIsGameOver(false);
  };

  // Setup timer when game starts
  useEffect(() => {
    let interval: number | undefined;
    
    if (isGameStarted && !isGameOver) {
      interval = window.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isGameStarted, isGameOver]);

  // Check for win condition
  useEffect(() => {
    if (matchedPairs === emojis.length && isGameStarted) {
      setIsGameOver(true);
      toast({
        title: "Congratulations!",
        description: `You completed the game in ${moves} moves and ${formatTime(timer)}!`,
      });
    }
  }, [matchedPairs, isGameStarted, moves, timer, toast]);

  // Handle card click
  const handleCardClick = (cardId: number) => {
    // Ignore click if the card is already flipped or matched
    if (cards[cardId].isFlipped || cards[cardId].isMatched || flippedCards.length >= 2) {
      return;
    }
    
    // Flip the card
    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    // If we have 2 flipped cards, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      
      // Check if the cards match
      if (cards[firstCardId].emoji === cards[secondCardId].emoji) {
        // Mark cards as matched
        newCards[firstCardId].isMatched = true;
        newCards[secondCardId].isMatched = true;
        
        setCards(newCards);
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
        
        // Provide feedback for match
        toast({
          description: "Great! You found a match!",
          variant: "default", // Changed from "success" to "default"
        });
      } else {
        // If not a match, flip cards back after a short delay
        setTimeout(() => {
          newCards[firstCardId].isFlipped = false;
          newCards[secondCardId].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
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
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={initializeGame}
            className="flex items-center gap-2"
          >
            <Shuffle className="h-4 w-4" />
            {isGameStarted ? t('playAgain') : t('startGame')}
          </Button>
          
          {isGameStarted && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{t('moves')}: {moves}</span>
              <span>|</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" /> {formatTime(timer)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {!isGameStarted ? (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">{t('memoryChallenge')}</h3>
            <p className="mb-4">Test your memory by finding matching pairs of cards. Flip two cards at a time and remember their positions.</p>
            <Button onClick={initializeGame}>{t('startGame')}</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {cards.map((card) => (
              <div 
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`
                  aspect-square rounded-lg transition-all duration-300 cursor-pointer
                  ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
                  ${card.isMatched ? 'opacity-70' : ''}
                `}
                style={{ perspective: '1000px' }}
              >
                <div 
                  className={`
                    relative w-full h-full transition-transform duration-300 transform-style-preserve-3d
                    ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
                  `}
                >
                  {/* Card Back */}
                  <div 
                    className={`
                      absolute w-full h-full flex items-center justify-center bg-primary/10 border-2 border-primary/20 rounded-lg backface-hidden
                      ${card.isFlipped || card.isMatched ? 'hidden' : ''}
                    `}
                  >
                    <span className="text-2xl">?</span>
                  </div>
                  
                  {/* Card Front */}
                  <div 
                    className={`
                      absolute w-full h-full flex items-center justify-center bg-background border-2 border-primary/20 rounded-lg backface-hidden transform rotate-y-180
                      ${card.isFlipped || card.isMatched ? '' : 'hidden'}
                    `}
                  >
                    <span className="text-4xl">{card.emoji}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {isGameOver && (
            <Card className="mt-6 bg-primary/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{t('gameOver')}</h3>
                <p className="mb-4">You completed the game in {moves} moves and {formatTime(timer)}!</p>
                <Button onClick={initializeGame}>{t('playAgain')}</Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
