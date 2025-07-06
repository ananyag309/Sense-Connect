
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alex Chen",
    role: "High School Student",
    content:
      "The study roadmap helped me organize my AP classes and stay on track with college applications. I love how I can adjust text size for easier reading.",
    avatar: "AC",
  },
  {
    name: "Priya Shah",
    role: "College Freshman",
    content:
      "As someone with dyslexia, the voice-to-text feature in the notes section has been a game-changer for me. I can capture ideas without struggling to type them out.",
    avatar: "PS",
  },
  {
    name: "Marcus Johnson",
    role: "Middle School Student",
    content:
      "I use the high contrast mode because of my visual impairment, and it works great! I can see everything clearly and the screen reader support is excellent.",
    avatar: "MJ",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Hear From Our Students
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real experiences from students who have transformed their learning
            journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="border transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
