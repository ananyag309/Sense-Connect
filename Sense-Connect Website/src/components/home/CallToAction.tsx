
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-12 md:py-24 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Start Your Learning Journey Today
        </h2>
        <p className="mt-4 text-xl max-w-[800px] mx-auto">
          Join thousands of students who are achieving their academic goals with
          our accessible, inclusive educational platform.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-primary"
            asChild
          >
            <Link to="/signup">
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <Link to="/demo">Watch Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
