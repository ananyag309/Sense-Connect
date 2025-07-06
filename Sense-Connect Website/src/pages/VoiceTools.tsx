
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextToSpeech from "@/components/accessibility/TextToSpeech";
import VoiceToText from "@/components/accessibility/VoiceToText";

const VoiceToolsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Voice Tools
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Accessible voice tools to help with communication and learning.
            </p>
          </div>

          <Tabs defaultValue="text-to-speech" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text-to-speech">Text to Speech</TabsTrigger>
              <TabsTrigger value="voice-to-text">Voice to Text</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text-to-speech" className="space-y-4">
              <TextToSpeech />
            </TabsContent>
            
            <TabsContent value="voice-to-text" className="space-y-4">
              <VoiceToText />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Botpress Chat Integration */}
      <div id="bp-web-widget-container"></div>
    </div>
  );
};

export default VoiceToolsPage;
