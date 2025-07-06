
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Calendar, LineChart, MessageSquare, Video, Code, Users } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Hero = () => {
  const { isSignedIn } = useUser();

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your Path to Academic Success
              </h1>
              <p className="text-muted-foreground md:text-xl">
                An inclusive learning platform designed for all students, with special focus
                on accessibility for children with disabilities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link to={isSignedIn ? "/dashboard" : "/login"}>
                  {isSignedIn ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/resources">Explore Resources</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-4">
              <Link to={isSignedIn ? "/roadmap" : "/login"} className="block">
                <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <BookOpen className="h-10 w-10 text-primary mb-3" />
                  <h3 className="text-xl font-bold">Study Roadmap</h3>
                  <p className="text-muted-foreground">
                    Create your personalized learning plan
                  </p>
                </div>
              </Link>
              <Link to={isSignedIn ? "/calendar" : "/login"} className="block">
                <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Calendar className="h-10 w-10 text-primary mb-3" />
                  <h3 className="text-xl font-bold">Important Dates</h3>
                  <p className="text-muted-foreground">
                    Track assignments and exams
                  </p>
                </div>
              </Link>
            </div>
            <div className="grid gap-4">
              <Link to={isSignedIn ? "/programming" : "/login"} className="block">
                <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Code className="h-10 w-10 text-primary mb-3" />
                  <h3 className="text-xl font-bold">Programming</h3>
                  <p className="text-muted-foreground">
                    Learn coding with various languages
                  </p>
                </div>
              </Link>
              <Link to={isSignedIn ? "/interview" : "/login"} className="block">
                <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Users className="h-10 w-10 text-primary mb-3" />
                  <h3 className="text-xl font-bold">Interview Prep</h3>
                  <p className="text-muted-foreground">
                    Practice with AI-powered interviews
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
