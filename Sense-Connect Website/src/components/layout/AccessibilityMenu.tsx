
import React from "react";
import { Accessibility, ZoomIn, ZoomOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const AccessibilityMenu = () => {
  const [fontSize, setFontSize] = React.useState(100);

  const changeFontSize = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const increaseFont = () => {
    const newSize = Math.min(fontSize + 10, 150);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const decreaseFont = () => {
    const newSize = Math.max(fontSize - 10, 70);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Accessibility options">
          <Accessibility className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col items-start gap-2">
          <span className="text-sm font-medium">Text Size</span>
          <div className="flex w-full items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decreaseFont}
              aria-label="Decrease font size"
            >
              <ZoomOut className="h-4 w-4" />
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
              onClick={increaseFont}
              aria-label="Increase font size"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">
            Current: {fontSize}%
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessibilityMenu;
