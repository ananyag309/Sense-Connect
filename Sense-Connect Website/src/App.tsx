import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import Roadmap from "./pages/Roadmap";
import ProgressPage from "./pages/Progress";
import NotesPage from "./pages/Notes";
import CalendarPage from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import InterviewPage from "./pages/Interview";
import VideoConferencePage from "./pages/VideoConference";
import Dashboard from "./pages/Dashboard";
import Programming from "./pages/Programming";
import Resources from "./pages/Resources";
import GamesPage from "./pages/Games";
import TherapyPage from "./pages/Therapy";
import ResumeBuilder from "./pages/Resume";
import InternshipsPage from "./pages/Internships";
import VoiceToolsPage from "./pages/VoiceTools";
import SignLanguagePage from "./pages/SignLanguage";

const queryClient = new QueryClient();

// Component that requires authentication
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App = () => {
  // Inject Botpress WebChat
  useEffect(() => {
    const loadBotpress = () => {
      // Only load if not already loaded
      if (!window.botpressWebChat) {
        const scriptInject = document.createElement("script");
        scriptInject.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js";
        scriptInject.async = true;
        scriptInject.defer = true;
        scriptInject.onload = () => {
          const scriptConfig = document.createElement("script");
          scriptConfig.src = "https://files.bpcontent.cloud/2025/04/13/06/20250413065631-Z192Q52C.js";
          scriptConfig.async = true;
          scriptConfig.defer = true;
          document.body.appendChild(scriptConfig);
        };
        document.body.appendChild(scriptInject);
      }
    };

    // Load immediately
    loadBotpress();

    // Also load on route changes
    const handleRouteChange = () => {
      setTimeout(loadBotpress, 500);
    };
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/factor-one" element={<Navigate to="/dashboard" />} /> {/* 👈 Fixes the 404 */}

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmap"
              element={
                <ProtectedRoute>
                  <Roadmap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <ProgressPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NotesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <InterviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/video-conference"
              element={
                <ProtectedRoute>
                  <VideoConferencePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/programming/*"
              element={
                <ProtectedRoute>
                  <Programming />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games"
              element={
                <ProtectedRoute>
                  <GamesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/therapy"
              element={
                <ProtectedRoute>
                  <TherapyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/internships"
              element={
                <ProtectedRoute>
                  <InternshipsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/voice-tools"
              element={
                <ProtectedRoute>
                  <VoiceToolsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-language"
              element={
                <ProtectedRoute>
                  <SignLanguagePage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
