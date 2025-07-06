
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import SignLanguageTranslator from "@/components/accessibility/SignLanguageTranslator";

const SignLanguagePage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('signLanguageTranslator')}
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Translate sign language into text using your camera
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SignLanguageTranslator />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t('howItWorks')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our sign language translator uses computer vision to recognize and interpret sign language gestures in real-time.
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Enable your camera by toggling the switch</li>
                  <li>Position yourself so your hands are clearly visible</li>
                  <li>Turn on translation to start interpreting your signs</li>
                  <li>The translated text will appear below the video feed</li>
                </ol>
                <p className="text-sm text-muted-foreground">
                  Note: This feature works best in good lighting conditions and when signs are performed clearly. Currently supports American Sign Language (ASL).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      {/* Botpress Chat Integration */}
      <div id="bp-web-widget-container"></div>
    </div>
  );
};

export default SignLanguagePage;
