
import { useState, useCallback } from "react";

interface Message {
  id: number;
  sender: string;
  text: string;
}

interface Participant {
  id: number;
  name: string;
  avatarUrl: string;
}

interface UseVideoConferenceResult {
  // Audio/Video states
  isMuted: boolean;
  isCameraOff: boolean;
  screenShareEnabled: boolean;
  captionsEnabled: boolean;
  
  // UI states
  fontSize: number;
  
  // Data
  participants: Participant[];
  messages: Message[];
  isScreenSharing: boolean;
  activeScreenShare: string | null;
  
  // Actions
  toggleMute: () => void;
  toggleCamera: () => void;
  toggleScreenShare: () => void;
  toggleCaptions: () => void;
  changeFontSize: (value: number[]) => void;
  sendMessage: (text: string) => void;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;
}

export const useVideoConference = (): UseVideoConferenceResult => {
  // Audio/Video states
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  
  // UI states
  const [fontSize, setFontSize] = useState(100);
  
  // Screen sharing states
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeScreenShare, setActiveScreenShare] = useState<string | null>(null);
  
  // Data
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "Alex Johnson", avatarUrl: "https://github.com/shadcn.png" },
    { id: 2, name: "Emily Smith", avatarUrl: "https://github.com/sadmann7.png" },
    { id: 3, name: "Jordan Lee", avatarUrl: "https://github.com/peduarte.png" },
  ]);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Alex Johnson", text: "Hi everyone!" },
    { id: 2, sender: "Emily Smith", text: "Hello Alex!" },
  ]);
  
  // Actions
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);
  
  const toggleCamera = useCallback(() => {
    setIsCameraOff((prev) => !prev);
  }, []);
  
  const toggleScreenShare = useCallback(() => {
    setScreenShareEnabled((prev) => !prev);
  }, []);
  
  const toggleCaptions = useCallback(() => {
    setCaptionsEnabled((prev) => !prev);
  }, []);
  
  const changeFontSize = useCallback((value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  }, []);
  
  const sendMessage = useCallback((text: string) => {
    if (text.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        text: text,
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [messages]);
  
  // Screen sharing methods
  const startScreenShare = useCallback(async () => {
    try {
      // In a real implementation, we would use the browser's screen capture API
      // For this placeholder, we'll simulate a successful screen share
      console.log("Starting screen share (placeholder)");
      
      // Placeholder - in real implementation would get media stream
      // const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      
      // Set placeholder image for screen sharing
      setActiveScreenShare("/placeholder.svg");
      setIsScreenSharing(true);
      
      // Announce to the chat that screen sharing has started
      sendMessage("You started sharing your screen");
      
    } catch (error) {
      console.error("Error starting screen share:", error);
      setIsScreenSharing(false);
      setActiveScreenShare(null);
      sendMessage("Failed to start screen sharing");
    }
  }, [sendMessage]);
  
  const stopScreenShare = useCallback(() => {
    console.log("Stopping screen share (placeholder)");
    setIsScreenSharing(false);
    setActiveScreenShare(null);
    sendMessage("You stopped sharing your screen");
  }, [sendMessage]);
  
  return {
    // Audio/Video states
    isMuted,
    isCameraOff,
    screenShareEnabled,
    captionsEnabled,
    
    // UI states
    fontSize,
    
    // Data
    participants,
    messages,
    isScreenSharing,
    activeScreenShare,
    
    // Actions
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    toggleCaptions,
    changeFontSize,
    sendMessage,
    startScreenShare,
    stopScreenShare,
  };
};
