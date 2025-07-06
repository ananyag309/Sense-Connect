
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Gamepad, Brain, Pencil, Calculator, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import MemoryGame from "@/components/games/MemoryGame";
import MathGame from "@/components/games/MathGame";
import SpellingGame from "@/components/games/SpellingGame";
import SignLanguageTranslator from "@/components/accessibility/SignLanguageTranslator";

const GameCategory = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  onClick: () => void;
}) => (
  <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
      <Icon className="h-10 w-10 text-primary" />
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const GamesPage = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleGameSelect = (game: string) => {
    setActiveGame(game);
    toast({
      title: "Loading game",
      description: `Starting ${game} game. Have fun!`,
    });
  };

  const handleBackToCategories = () => {
    setActiveGame(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Interactive Learning Games
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Fun, accessible games designed to support different learning styles and abilities.
            </p>
          </div>

          {!activeGame ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GameCategory 
                icon={Brain}
                title={t('memoryChallenge')}
                description="Improve your memory with matching card games"
                onClick={() => handleGameSelect('memory')}
              />
              <GameCategory 
                icon={Calculator}
                title={t('mathAdventures')}
                description="Practice math skills through fun problem-solving"
                onClick={() => handleGameSelect('math')}
              />
              <GameCategory 
                icon={Pencil}
                title={t('spellingBee')}
                description="Enhance vocabulary and spelling abilities"
                onClick={() => handleGameSelect('spelling')}
              />
              <GameCategory 
                icon={Languages}
                title={t('signLanguageTranslator')}
                description="Translate sign language into text with your camera"
                onClick={() => handleGameSelect('signLanguage')}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <Button 
                variant="outline" 
                onClick={handleBackToCategories}
                className="mb-4"
              >
                Back to Categories
              </Button>
              
              {activeGame === 'memory' && <MemoryGame />}
              {activeGame === 'math' && <MathGame />}
              {activeGame === 'spelling' && <SpellingGame />}
              {activeGame === 'signLanguage' && <SignLanguageTranslator />}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Botpress Chat Integration */}
      <div id="bp-web-widget-container"></div>
    </div>
  );
};

export default GamesPage;
