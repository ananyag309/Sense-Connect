
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface AccessibilitySettingsProps {
  fontSize: number;
  captionsEnabled: boolean;
  screenShareEnabled: boolean;
  toggleCaptions: () => void;
  toggleScreenShare: () => void;
  changeFontSize: (value: number[]) => void;
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({
  fontSize,
  captionsEnabled,
  screenShareEnabled,
  toggleCaptions,
  toggleScreenShare,
  changeFontSize,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="font-size">Text Size: {fontSize}%</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Decrease font size"
            onClick={() => changeFontSize([Math.max(70, fontSize - 5)])}
          >
            -
          </Button>
          <Slider
            id="font-size"
            value={[fontSize]}
            min={70}
            max={150}
            step={5}
            onValueChange={changeFontSize}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Increase font size"
            onClick={() => changeFontSize([Math.min(150, fontSize + 5)])}
          >
            +
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="captions-toggle">Closed Captions</Label>
        <Switch
          id="captions-toggle"
          checked={captionsEnabled}
          onCheckedChange={toggleCaptions}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="screen-share-toggle">Screen Share</Label>
        <Switch
          id="screen-share-toggle"
          checked={screenShareEnabled}
          onCheckedChange={toggleScreenShare}
        />
      </div>
    </div>
  );
};

export default AccessibilitySettings;
