
import React, { useEffect, useState } from "react";
import VideoStream from "./VideoStream";
import VideoControls from "./VideoControls";
import ParticipantsList from "./ParticipantsList";
import ChatPanel from "./ChatPanel";
import { useVideoConference } from "@/hooks/useVideoConference";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AccessibleVideoConference = () => {
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(true);
  const [permissionAllowed, setPermissionAllowed] = useState(false);
  const { toast } = useToast();

  const {
    isMuted,
    isCameraOff,
    screenShareEnabled,
    captionsEnabled,
    fontSize,
    participants,
    messages,
    isScreenSharing,
    activeScreenShare,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    toggleCaptions,
    changeFontSize,
    sendMessage,
    startScreenShare,
    stopScreenShare
  } = useVideoConference();

  useEffect(() => {
    // If permissions already granted, just close the dialog
    if (permissionAllowed) {
      setShowPermissionsDialog(false);
    }
  }, [permissionAllowed]);

  const requestMediaPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermissionAllowed(true);
      setShowPermissionsDialog(false);
      toast({
        description: "Camera and microphone access granted!",
      });
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast({
        title: "Permission Error",
        description: "Could not access camera or microphone. Please check your browser settings.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Camera and Microphone Access</DialogTitle>
            <DialogDescription>
              This video conference requires access to your camera and microphone. 
              Please allow access when prompted by your browser.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={requestMediaPermissions}>
              Allow Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Video Area */}
        <div className="md:col-span-2 relative">
          <VideoStream 
            isCameraOff={isCameraOff} 
            captionsEnabled={captionsEnabled}
            isScreenSharing={isScreenSharing}
            activeScreenShare={activeScreenShare}
            permissionAllowed={permissionAllowed}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center gap-4">
            <VideoControls
              isMuted={isMuted}
              isCameraOff={isCameraOff}
              captionsEnabled={captionsEnabled}
              screenShareEnabled={screenShareEnabled}
              fontSize={fontSize}
              isScreenSharing={isScreenSharing}
              toggleMute={toggleMute}
              toggleCamera={toggleCamera}
              toggleCaptions={toggleCaptions}
              toggleScreenShare={toggleScreenShare}
              changeFontSize={changeFontSize}
              startScreenShare={startScreenShare}
              stopScreenShare={stopScreenShare}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Participants */}
          <ParticipantsList participants={participants} />
          
          {/* Chat */}
          <ChatPanel 
            initialMessages={messages} 
            onSendMessage={sendMessage} 
          />
        </div>
      </div>
    </>
  );
};

export default AccessibleVideoConference;
