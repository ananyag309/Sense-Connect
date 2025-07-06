
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Play, Pause, StopCircle, Save, UploadCloud, PlusCircle, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [voice, setVoice] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedMessages, setSavedMessages] = useState<{ id: number; text: string; label: string }[]>([]);
  const [newMessageLabel, setNewMessageLabel] = useState('');
  const synth = useRef<SpeechSynthesis | null>(null);
  const speechUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  // Initialize speech synthesis
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synth.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const availableVoices = synth.current?.getVoices() || [];
        setVoices(availableVoices);
        
        // Set default voice to first English voice if available
        const englishVoice = availableVoices.find(voice => voice.lang.includes('en'));
        if (englishVoice) {
          setVoice(englishVoice.name);
        } else if (availableVoices.length > 0) {
          setVoice(availableVoices[0].name);
        }
      };

      // Chrome loads voices asynchronously
      if (synth.current.onvoiceschanged !== undefined) {
        synth.current.onvoiceschanged = loadVoices;
      }
      
      loadVoices();
    }
    
    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, []);

  // Handle speech end
  React.useEffect(() => {
    const handleSpeechEnd = () => {
      setIsPlaying(false);
    };
    
    if (speechUtterance.current) {
      speechUtterance.current.onend = handleSpeechEnd;
    }
    
    return () => {
      if (speechUtterance.current) {
        speechUtterance.current.onend = null;
      }
    };
  }, [speechUtterance.current]);

  const speakText = () => {
    if (!synth.current || !text.trim()) return;
    
    // Cancel any ongoing speech
    synth.current.cancel();
    
    // Create new utterance
    speechUtterance.current = new SpeechSynthesisUtterance(text);
    
    // Set voice if specified
    if (voice) {
      const selectedVoice = voices.find(v => v.name === voice);
      if (selectedVoice) {
        speechUtterance.current.voice = selectedVoice;
      }
    }
    
    // Set rate and pitch
    speechUtterance.current.rate = rate;
    speechUtterance.current.pitch = pitch;
    
    // Start speaking
    synth.current.speak(speechUtterance.current);
    setIsPlaying(true);
  };

  const pauseSpeech = () => {
    if (!synth.current) return;
    
    if (isPlaying) {
      synth.current.pause();
    } else {
      synth.current.resume();
    }
    
    setIsPlaying(!isPlaying);
  };

  const stopSpeech = () => {
    if (!synth.current) return;
    
    synth.current.cancel();
    setIsPlaying(false);
  };

  const saveMessage = () => {
    if (!text.trim() || !newMessageLabel.trim()) {
      toast({
        description: "Please enter both a message and a label",
        variant: "destructive"
      });
      return;
    }
    
    const newMessage = {
      id: Date.now(),
      text,
      label: newMessageLabel
    };
    
    setSavedMessages([...savedMessages, newMessage]);
    setNewMessageLabel('');
    
    toast({
      description: "Message saved successfully",
    });
  };

  const loadMessage = (id: number) => {
    const message = savedMessages.find(msg => msg.id === id);
    if (message) {
      setText(message.text);
    }
  };

  const deleteMessage = (id: number) => {
    setSavedMessages(savedMessages.filter(msg => msg.id !== id));
    toast({
      description: "Message deleted",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Text to Speech
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="speech-text">Enter Text</Label>
          <Textarea
            id="speech-text"
            placeholder="Type or paste text you want to be read aloud"
            className="min-h-[100px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="voice-select">Voice</Label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger id="voice-select">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((v) => (
                  <SelectItem key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="rate-slider">Rate: {rate.toFixed(1)}</Label>
              </div>
              <Slider
                id="rate-slider"
                value={[rate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(value) => setRate(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="pitch-slider">Pitch: {pitch.toFixed(1)}</Label>
              </div>
              <Slider
                id="pitch-slider"
                value={[pitch]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(value) => setPitch(value[0])}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-2">
          <Button 
            onClick={speakText} 
            disabled={!text.trim() || isPlaying}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Speak
          </Button>
          <Button 
            onClick={pauseSpeech} 
            disabled={!isPlaying}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Pause className="h-4 w-4" />
            Pause
          </Button>
          <Button 
            onClick={stopSpeech} 
            disabled={!isPlaying}
            variant="outline"
            className="flex items-center gap-2"
          >
            <StopCircle className="h-4 w-4" />
            Stop
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-4">Saved Messages</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="message-label">Label for new message</Label>
              <div className="flex gap-2">
                <Input 
                  id="message-label" 
                  placeholder="E.g., Greeting, Introduction, etc."
                  value={newMessageLabel}
                  onChange={(e) => setNewMessageLabel(e.target.value)}
                />
                <Button 
                  onClick={saveMessage} 
                  disabled={!text.trim() || !newMessageLabel.trim()}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {savedMessages.length === 0 ? (
                <div className="text-center p-4 border rounded-md bg-muted/10">
                  <p className="text-muted-foreground">No saved messages yet</p>
                </div>
              ) : (
                savedMessages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between border rounded-md p-2">
                    <span className="font-medium truncate flex-1">{message.label}</span>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => loadMessage(message.id)}
                        title="Load message"
                      >
                        <UploadCloud className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => deleteMessage(message.id)}
                        className="text-destructive hover:text-destructive/90"
                        title="Delete message"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToSpeech;
