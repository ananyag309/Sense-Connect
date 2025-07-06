
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, LineChart, MessageSquare, Video, Award } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    title: "Study Roadmap Generator",
    description:
      "Create a personalized learning plan tailored to your goals, schedule, and learning style.",
  },
  {
    icon: <LineChart className="h-12 w-12 text-primary" />,
    title: "Progress Tracker",
    description:
      "Monitor your learning journey with visual charts and completion metrics.",
  },
  {
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
    title: "Notes Section",
    description:
      "Take and organize notes with voice-to-text capabilities for improved accessibility.",
  },
  {
    icon: <Calendar className="h-12 w-12 text-primary" />,
    title: "Important Dates",
    description:
      "Never miss a deadline with our calendar for assignments, exams, and project milestones.",
  },
  {
    icon: <Award className="h-12 w-12 text-primary" />,
    title: "Interview Preparation",
    description:
      "Practice with AI-powered interview simulations and receive feedback to improve.",
  },
  {
    icon: <Video className="h-12 w-12 text-primary" />,
    title: "Accessible Video Conferencing",
    description:
      "Connect with peers and teachers through our inclusive video platform with accessibility features.",
  },
];

const Features = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Features Designed for Everyone
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Our platform is built with inclusivity in mind, ensuring all students can access
            the tools they need to succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
