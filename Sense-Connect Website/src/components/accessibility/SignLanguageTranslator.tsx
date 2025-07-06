
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Camera, Video, VideoOff, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

// Sample sign language translations for demo
const sampleTranslations = [
  "Hello, nice to meet you",
  "My name is...",
  "How are you?",
  "I am fine, thank you",
  "Yes",
  "No",
  "Thank you",
  "Please",
  "I need help",
  "I understand sign language"
];

const SignLanguageTranslator = () => {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const translationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const setupCamera = async () => {
      try {
        if (cameraEnabled) {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: "user"
            } 
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          
          toast({
            title: t('cameraEnabled'),
            description: t('signLanguageReady'),
          });
        } else if (stream) {
          // Stop all tracks when camera is disabled
          stream.getTracks().forEach(track => track.stop());
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast({
          title: t('cameraError'),
          description: t('cameraPermissionDenied'),
          variant: "destructive",
        });
        setCameraEnabled(false);
      }
    };

    setupCamera();

    // Cleanup
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      if (translationIntervalRef.current) {
        clearInterval(translationIntervalRef.current);
      }
    };
  }, [cameraEnabled, toast, t]);

  // Effect for simulating sign language translation
  useEffect(() => {
    if (translating) {
      // Simulate sign language detection by showing random translations
      translationIntervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * sampleTranslations.length);
        setCurrentTranslation(sampleTranslations[randomIndex]);
      }, 3000); // Change translation every 3 seconds
    } else {
      if (translationIntervalRef.current) {
        clearInterval(translationIntervalRef.current);
        setCurrentTranslation("");
      }
    }

    return () => {
      if (translationIntervalRef.current) {
        clearInterval(translationIntervalRef.current);
      }
    };
  }, [translating]);

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
    if (translating) {
      setTranslating(false);
    }
  };

  const toggleTranslation = () => {
    if (!cameraEnabled) {
      setCameraEnabled(true);
    }
    setTranslating(!translating);
    
    toast({
      description: translating ? t('translationStopped') : t('translationStarted'),
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Camera className="mr-2 h-5 w-5" />
          {t('signLanguageTranslator')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {cameraEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              <Label htmlFor="camera-toggle">{t('camera')}</Label>
            </div>
            <Switch
              id="camera-toggle"
              checked={cameraEnabled}
              onCheckedChange={toggleCamera}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <Label htmlFor="translation-toggle">{t('translation')}</Label>
            </div>
            <Switch
              id="translation-toggle"
              checked={translating}
              onCheckedChange={toggleTranslation}
              disabled={!cameraEnabled}
            />
          </div>
        </div>
        
        <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
          {cameraEnabled ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Button onClick={toggleCamera} variant="outline">
                <Camera className="mr-2 h-4 w-4" />
                {t('enableCamera')}
              </Button>
            </div>
          )}
          
          {cameraEnabled && translating && (
            <div className="absolute bottom-2 right-2 bg-background p-2 rounded shadow">
              <div className="text-sm font-medium animate-pulse flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {t('translatingSignLanguage')}
              </div>
            </div>
          )}
        </div>
        
        {cameraEnabled && translating && (
          <div className="p-3 bg-muted rounded">
            <p className="text-sm font-medium">{t('translatedText')}:</p>
            <p className="italic">
              {currentTranslation || t('translationPlaceholder')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SignLanguageTranslator;
