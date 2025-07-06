
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Copy, Save, PauseCircle, StopCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const VoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [savedTranscripts, setSavedTranscripts] = useState<{ id: number; text: string; title: string }[]>([]);
  const [newTranscriptTitle, setNewTranscriptTitle] = useState('');
  
  const recognition = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        recognition.current.lang = language;
        
        recognition.current.onresult = (event) => {
          let currentTranscript = '';
          
          for (let i = 0; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              currentTranscript += event.results[i][0].transcript + ' ';
            }
          }
          
          setTranscript(prevTranscript => prevTranscript + currentTranscript);
        };
        
        recognition.current.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          toast({
            title: "Error",
            description: `Speech recognition error: ${event.error}`,
            variant: "destructive"
          });
          setIsRecording(false);
        };
      } else {
        toast({
          title: "Not Supported",
          description: "Speech recognition is not supported in this browser.",
          variant: "destructive"
        });
      }
    }
    
    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  // Update recognition language when language changes
  useEffect(() => {
    if (recognition.current) {
      recognition.current.lang = language;
    }
  }, [language]);

  const startRecording = () => {
    if (!recognition.current) return;
    
    try {
      recognition.current.start();
      setIsRecording(true);
      setIsPaused(false);
      
      toast({
        description: "Recording started. Speak now!",
      });
    } catch (error) {
      console.error('Error starting recognition', error);
      
      // If recognition is already started, restart it
      recognition.current.stop();
      setTimeout(() => {
        if (recognition.current) {
          recognition.current.start();
          setIsRecording(true);
          setIsPaused(false);
        }
      }, 100);
    }
  };

  const pauseRecording = () => {
    if (!recognition.current) return;
    
    recognition.current.stop();
    setIsPaused(true);
    
    toast({
      description: "Recording paused. Click resume to continue.",
    });
  };

  const resumeRecording = () => {
    if (!recognition.current) return;
    
    recognition.current.start();
    setIsPaused(false);
    
    toast({
      description: "Recording resumed.",
    });
  };

  const stopRecording = () => {
    if (!recognition.current) return;
    
    recognition.current.stop();
    setIsRecording(false);
    setIsPaused(false);
    
    toast({
      description: "Recording stopped.",
    });
  };

  const copyTranscript = () => {
    if (!transcript.trim()) return;
    
    navigator.clipboard.writeText(transcript);
    
    toast({
      description: "Transcript copied to clipboard.",
    });
  };

  const clearTranscript = () => {
    setTranscript('');
    
    toast({
      description: "Transcript cleared.",
    });
  };

  const saveTranscript = () => {
    if (!transcript.trim() || !newTranscriptTitle.trim()) {
      toast({
        description: "Please enter both a transcript and a title.",
        variant: "destructive"
      });
      return;
    }
    
    const newSavedTranscript = {
      id: Date.now(),
      text: transcript,
      title: newTranscriptTitle
    };
    
    setSavedTranscripts([...savedTranscripts, newSavedTranscript]);
    setNewTranscriptTitle('');
    
    toast({
      description: "Transcript saved successfully.",
    });
  };

  const downloadTranscript = (id?: number) => {
    let text = transcript;
    let filename = 'transcript.txt';
    
    if (id) {
      const savedTranscript = savedTranscripts.find(t => t.id === id);
      if (savedTranscript) {
        text = savedTranscript.text;
        filename = `${savedTranscript.title.replace(/\s+/g, '_')}.txt`;
      }
    }
    
    if (!text.trim()) return;
    
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      description: "Transcript downloaded as text file.",
    });
  };

  const deleteTranscript = (id: number) => {
    setSavedTranscripts(savedTranscripts.filter(t => t.id !== id));
    
    toast({
      description: "Transcript deleted.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Voice to Text
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="language-select">Select Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language-select">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
              <SelectItem value="es-ES">Spanish</SelectItem>
              <SelectItem value="fr-FR">French</SelectItem>
              <SelectItem value="de-DE">German</SelectItem>
              <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
              <SelectItem value="hi-IN">Hindi</SelectItem>
              <SelectItem value="ja-JP">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="transcript">Transcript</Label>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={copyTranscript}
                disabled={!transcript.trim()}
                title="Copy transcript"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearTranscript}
                disabled={!transcript.trim()}
                title="Clear transcript"
              >
                <StopCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => downloadTranscript()}
                disabled={!transcript.trim()}
                title="Download transcript"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your speech will appear here..."
            className="min-h-[150px]"
          />
        </div>
        
        <div className="flex justify-center gap-2">
          {!isRecording ? (
            <Button 
              onClick={startRecording} 
              className="flex items-center gap-2"
            >
              <Mic className="h-4 w-4" />
              Start Recording
            </Button>
          ) : isPaused ? (
            <Button 
              onClick={resumeRecording} 
              className="flex items-center gap-2"
            >
              <Mic className="h-4 w-4" />
              Resume
            </Button>
          ) : (
            <Button 
              onClick={pauseRecording} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <PauseCircle className="h-4 w-4" />
              Pause
            </Button>
          )}
          
          <Button 
            onClick={stopRecording} 
            disabled={!isRecording}
            variant="outline"
            className="flex items-center gap-2"
          >
            <StopCircle className="h-4 w-4" />
            Stop
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-4">Save Transcript</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transcript-title">Title</Label>
              <div className="flex gap-2">
                <Input 
                  id="transcript-title" 
                  placeholder="E.g., Meeting Notes, Lecture, etc."
                  value={newTranscriptTitle}
                  onChange={(e) => setNewTranscriptTitle(e.target.value)}
                />
                <Button 
                  onClick={saveTranscript} 
                  disabled={!transcript.trim() || !newTranscriptTitle.trim()}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
            
            {savedTranscripts.length > 0 && (
              <div className="space-y-2">
                <Label>Saved Transcripts</Label>
                <div className="space-y-2">
                  {savedTranscripts.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border rounded-md p-3">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                          {item.text.substring(0, 50)}...
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => downloadTranscript(item.id)}
                          title="Download transcript"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => deleteTranscript(item.id)}
                          className="text-destructive hover:text-destructive/90"
                          title="Delete transcript"
                        >
                          <StopCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceToText;
