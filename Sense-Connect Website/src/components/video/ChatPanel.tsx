
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquareText } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  text: string;
}

interface ChatPanelProps {
  initialMessages: Message[];
  onSendMessage: (text: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ initialMessages, onSendMessage }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Update messages when props change
  React.useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSendMessage = (text: string) => {
    if (text.trim() !== "") {
      onSendMessage(text);
    }
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h3 className="text-sm font-bold mb-2">Chat</h3>
        <div className="mb-4 h-48 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              <span className="font-semibold">{message.sender}:</span> {message.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <Button onClick={(e) => {
            const inputElement = (e.target as HTMLElement).closest('div')?.querySelector('input');
            if (inputElement) {
              handleSendMessage(inputElement.value);
              inputElement.value = "";
            }
          }} aria-label="Send message">
            <MessageSquareText className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;
