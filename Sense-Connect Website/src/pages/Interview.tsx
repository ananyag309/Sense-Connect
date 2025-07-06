
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIInterviewPrep from "@/components/interview/AIInterviewPrep";

const InterviewPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              AI Interview Preparation
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Practice your interview skills and get real-time feedback from our AI assistant.
              Perfect for academic and professional interviews.
            </p>
          </div>
          <AIInterviewPrep />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewPage;
