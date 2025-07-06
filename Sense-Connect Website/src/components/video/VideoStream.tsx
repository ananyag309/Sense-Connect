
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoStreamProps {
  isCameraOff: boolean;
  captionsEnabled: boolean;
  isScreenSharing?: boolean;
  activeScreenShare?: string | null;
  permissionAllowed?: boolean;
}

const VideoStream: React.FC<VideoStreamProps> = ({ 
  isCameraOff, 
  captionsEnabled,
  isScreenSharing = false,
  activeScreenShare = null,
  permissionAllowed = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const setupCamera = async () => {
      try {
        if (permissionAllowed && !isCameraOff && !isScreenSharing) {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setStreamActive(true);
            setError(null);
          }
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setStreamActive(false);
        setError("Could not access camera. Please check your browser settings.");
      }
    };

    setupCamera();

    return () => {
      // Cleanup function to stop all tracks when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setStreamActive(false);
    };
  }, [isCameraOff, isScreenSharing, permissionAllowed]);

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
          {isScreenSharing && activeScreenShare ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={activeScreenShare} alt="Shared screen" className="max-w-full max-h-full" />
              </div>
              <div className="absolute top-2 right-2 text-xs bg-black text-white px-2 py-1 rounded">
                Screen Share Active
              </div>
            </>
          ) : (
            <>
              {!isCameraOff && permissionAllowed ? (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-4 text-center">
                  {!permissionAllowed ? (
                    "Camera access not granted"
                  ) : isCameraOff ? (
                    "Camera Off"
                  ) : (
                    "Video Stream"
                  )}
                  
                  {error && (
                    <p className="text-sm text-red-500 mt-2">{error}</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        {captionsEnabled && (
          <div className="mt-2 p-2 bg-gray-200 text-sm rounded-md">
            {isScreenSharing ? 
              "Presenter is sharing their screen. Describing [content on screen]..." : 
              "This is an example of closed captions. Captions will appear here in real-time."
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoStream;
