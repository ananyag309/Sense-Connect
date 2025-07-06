
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
}

const RoadmapChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hi there! I'm your AI study assistant. I can help you create a personalized study roadmap. What subjects are you interested in learning?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const botResponses: {[key: string]: string} = {
        "math": "Great choice! For mathematics, I recommend starting with algebra fundamentals before moving to geometry and calculus. Would you like a structured weekly plan?",
        "science": "For science, let's divide your learning into biology, chemistry, and physics. Which area would you like to focus on first?",
        "history": "History is fascinating! Let's create a chronological study plan. Would you prefer to start with ancient, medieval, or modern history?",
        "english": "For English studies, I recommend focusing on grammar, vocabulary, reading comprehension, and writing skills. Would you like a balanced approach or focus on a specific area?",
        "programming": "Programming is a great skill! I recommend starting with Python or JavaScript, then learning data structures and algorithms. Would you like a beginner, intermediate, or advanced roadmap?",
      };
      
      // Simple keyword matching for demo purposes
      let botReply = "I'm here to help you create a personalized study roadmap. Could you tell me which subjects you'd like to focus on?";
      
      const lowerInput = userMessage.text.toLowerCase();
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (lowerInput.includes(keyword)) {
          botReply = response;
          break;
        }
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        text: botReply
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Study Roadmap Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col h-[400px]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    } rounded-lg p-3`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {msg.type === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Bot className="h-4 w-4" />
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about creating your study roadmap..."
                className="flex-1"
              />
              <Button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapChatbot;
