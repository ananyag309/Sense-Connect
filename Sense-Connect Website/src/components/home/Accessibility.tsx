import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  AccessibilityIcon, 
  EyeIcon, 
  MousePointerIcon, 
  VolumeIcon, 
  ZoomInIcon, 
  SunMoonIcon, 
  PanelsTopLeftIcon,
  KeyboardIcon,
  MicIcon,
  TouchpadIcon,
  BrainIcon  
} from "lucide-react";

const Accessibility = () => {
  const [contrastMode, setContrastMode] = useState(false);
  const [fontSize, setFontSize] = useState([100]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  const toggleContrastMode = () => {
    setContrastMode(!contrastMode);
    document.documentElement.classList.toggle('high-contrast');
  };

  const changeFontSize = (values: number[]) => {
    setFontSize(values);
    document.documentElement.style.fontSize = `${values[0]}%`;
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Accessibility at the Core
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Designed with every student in mind, our platform emphasizes accessibility to ensure everyone has equal access to education.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="mb-6 border-primary/20 shadow-lg">
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SunMoonIcon className="h-5 w-5 text-primary" />
                    <Label htmlFor="contrast-mode">High Contrast Mode</Label>
                  </div>
                  <Switch 
                    id="contrast-mode" 
                    checked={contrastMode} 
                    onCheckedChange={toggleContrastMode}
                    aria-label="Toggle high contrast mode"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ZoomInIcon className="h-5 w-5 text-primary" />
                    <Label htmlFor="font-size">Font Size</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">A</span>
                    <Slider 
                      id="font-size"
                      value={fontSize} 
                      onValueChange={changeFontSize} 
                      min={70} 
                      max={150} 
                      step={10}
                      className="flex-1"
                      aria-label="Adjust font size"
                    />
                    <span className="text-lg">A</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">{fontSize}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="visual" className="mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="visual" className="flex flex-col items-center py-2 sm:flex-row sm:justify-start">
                <EyeIcon className="h-4 w-4 mr-0 sm:mr-2 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-sm">Visual</span>
              </TabsTrigger>
              <TabsTrigger value="auditory" className="flex flex-col items-center py-2 sm:flex-row sm:justify-start">
                <VolumeIcon className="h-4 w-4 mr-0 sm:mr-2 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-sm">Auditory</span>
              </TabsTrigger>
              <TabsTrigger value="motor" className="flex flex-col items-center py-2 sm:flex-row sm:justify-start">
                <MousePointerIcon className="h-4 w-4 mr-0 sm:mr-2 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-sm">Motor</span>
              </TabsTrigger>
              <TabsTrigger value="cognitive" className="flex flex-col items-center py-2 sm:flex-row sm:justify-start">
                <AccessibilityIcon className="h-4 w-4 mr-0 sm:mr-2 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-sm">Cognitive</span>
              </TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="visual" className="space-y-4">
                <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <PanelsTopLeftIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Color Blind Friendly</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Our high-contrast mode and color schemes are designed for users with color vision deficiencies.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <EyeIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Screen Reader Support</h3>
                        </div>
                        <p className="text-muted-foreground">
                          All elements are properly labeled for screen readers, ensuring visually impaired students can navigate easily.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <ZoomInIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Adjustable Text Size</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Easily increase or decrease text size throughout the platform to suit your visual needs.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <AccessibilityIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Image Descriptions</h3>
                        </div>
                        <p className="text-muted-foreground">
                          All images include detailed alt text descriptions for screen readers.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="auditory" className="space-y-4">
                <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <VolumeIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Closed Captions</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Video content includes accurate closed captions for deaf or hard-of-hearing students.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <MicIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Sign Language Support</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Video conferencing includes options for sign language interpretation.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <AccessibilityIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Visual Alerts</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Important audio information is accompanied by visual alerts and notifications.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <VolumeIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Text Transcripts</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Audio content is accompanied by text transcripts for reference.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="motor" className="space-y-4">
                <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <KeyboardIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Keyboard Navigation</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Complete keyboard accessibility for users who cannot use a mouse.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <MicIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Voice Commands</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Navigate and interact with the platform using voice commands.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <TouchpadIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Touch Optimization</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Large, well-spaced interactive elements for easier touch navigation.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <AccessibilityIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Assistive Technology</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Compatible with a wide range of assistive technologies and input devices.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="cognitive" className="space-y-4">
                <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <BrainIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Simple Interface</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Clean, distraction-free interface with clear navigation.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <PanelsTopLeftIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Consistent Layout</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Consistent patterns and layout across the platform for familiarity.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <AccessibilityIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Progress Indicators</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Clear progress indicators and feedback on all actions.
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <BrainIcon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold">Customizable Pace</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Learn at your own pace with adjustable timers and no time pressure.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Accessibility;
