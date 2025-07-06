
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  MicIcon, 
  Video, 
  MicOff, 
  VideoOff,
  MoreVertical,
  Subtitles,
  MonitorIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface VideoControlsProps {
  isMuted: boolean;
  isCameraOff: boolean;
  captionsEnabled: boolean;
  screenShareEnabled: boolean;
  fontSize: number;
  isScreenSharing: boolean;
  toggleMute: () => void;
  toggleCamera: () => void;
  toggleCaptions: () => void;
  toggleScreenShare: () => void;
  changeFontSize: (value: number[]) => void;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isMuted,
  isCameraOff,
  captionsEnabled,
  screenShareEnabled,
  fontSize,
  isScreenSharing,
  toggleMute,
  toggleCamera,
  toggleCaptions,
  toggleScreenShare,
  changeFontSize,
  startScreenShare,
  stopScreenShare,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 bg-gray-800 bg-opacity-50 p-2 rounded-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <MicOff className="h-5 w-5" /> : <MicIcon className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCamera}
        aria-label={isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
      >
        {isCameraOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
      </Button>
      <Button
        variant={isScreenSharing ? "default" : "ghost"}
        size="icon"
        onClick={isScreenSharing ? stopScreenShare : startScreenShare}
        aria-label={isScreenSharing ? "Stop Screen Share" : "Start Screen Share"}
        className={isScreenSharing ? "bg-red-500 hover:bg-red-600" : ""}
      >
        <MonitorIcon className="h-5 w-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="More options">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Accessibility</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start gap-2">
            <span className="text-sm font-medium">Text Size</span>
            <div className="flex w-full items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                aria-label="Decrease font size"
              >
                -
              </Button>
              <Slider
                value={[fontSize]}
                min={70}
                max={150}
                step={5}
                onValueChange={changeFontSize}
                className="flex-1"
                aria-label="Font size"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                aria-label="Increase font size"
              >
                +
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              Current: {fontSize}%
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="captions">Closed Captions</Label>
              <Switch id="captions" checked={captionsEnabled} onCheckedChange={toggleCaptions} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="screen-share">Screen Share</Label>
              <Switch id="screen-share" checked={screenShareEnabled} onCheckedChange={toggleScreenShare} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default VideoControls;
