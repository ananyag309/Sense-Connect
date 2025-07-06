
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccessibleVideoConference from "@/components/video/AccessibleVideoConference";

const VideoConferencePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Accessible Video Conferencing
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Connect with teachers and classmates with our accessible video platform,
              designed to support students with diverse abilities and needs.
            </p>
          </div>
          <AccessibleVideoConference />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoConferencePage;
