
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const ResourceCard = ({ title, description, link, buttonText = "Learn More" }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground">{description}</p>
      <Button asChild className="w-full">
        <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
          {buttonText} <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </CardContent>
  </Card>
);

const ProgrammingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Programming Resources
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Learn programming with our curated resources across different languages and technologies.
            </p>
          </div>

          <Tabs defaultValue="java" className="mb-12">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-6">
              <TabsTrigger value="java">Java</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="cpp">C++</TabsTrigger>
              <TabsTrigger value="dsa">DSA</TabsTrigger>
              <TabsTrigger value="mern">MERN</TabsTrigger>
              <TabsTrigger value="cs">CS Fundamentals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="java" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ResourceCard 
                  title="Java Programming Basics"
                  description="Learn the fundamentals of Java programming with interactive exercises"
                  link="https://www.codecademy.com/learn/learn-java"
                />
                <ResourceCard 
                  title="Oracle Java Tutorials"
                  description="Official Java programming tutorials from Oracle"
                  link="https://docs.oracle.com/javase/tutorial/"
                />
                <ResourceCard 
                  title="Java for Complete Beginners"
                  description="Video series teaching Java from the ground up"
                  link="https://www.youtube.com/watch?v=eIrMbAQSU34"
                  buttonText="Watch Tutorial"
                />
              </div>
              
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" /> Recommended GitHub Repositories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <a href="https://github.com/TheAlgorithms/Java" className="text-primary hover:underline flex items-center gap-2">
                        <Code className="h-4 w-4" /> The Algorithms - Java
                      </a>
                      <p className="text-sm text-muted-foreground">All algorithms implemented in Java</p>
                    </li>
                    <li>
                      <a href="https://github.com/iluwatar/java-design-patterns" className="text-primary hover:underline flex items-center gap-2">
                        <Code className="h-4 w-4" /> Java Design Patterns
                      </a>
                      <p className="text-sm text-muted-foreground">Design patterns implemented in Java</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="python" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ResourceCard 
                  title="Python for Everybody"
                  description="Introduction to Python programming for beginners"
                  link="https://www.py4e.com/"
                />
                <ResourceCard 
                  title="Automate the Boring Stuff"
                  description="Learn practical Python programming for everyday tasks"
                  link="https://automatetheboringstuff.com/"
                />
                <ResourceCard 
                  title="Python Crash Course"
                  description="Fast-paced introduction to Python programming"
                  link="https://www.youtube.com/watch?v=Z1Yd7upQsXY"
                  buttonText="Watch Tutorial"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="cpp" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ResourceCard 
                  title="C++ Programming Tutorial"
                  description="Learn C++ programming from scratch"
                  link="https://www.learncpp.com/"
                />
                <ResourceCard 
                  title="C++ Reference"
                  description="Comprehensive reference for C++ language"
                  link="https://en.cppreference.com/w/"
                />
                <ResourceCard 
                  title="C++ Programming Course"
                  description="Full course on modern C++ programming"
                  link="https://www.youtube.com/watch?v=vLnPwxZdW4Y"
                  buttonText="Watch Tutorial"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="dsa" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ResourceCard 
                  title="Data Structures and Algorithms"
                  description="Learn DSA concepts with visualizations"
                  link="https://visualgo.net/"
                />
                <ResourceCard 
                  title="LeetCode"
                  description="Practice coding problems to master DSA"
                  link="https://leetcode.com/"
                />
                <ResourceCard 
                  title="DSA in JavaScript"
                  description="Complete course on data structures and algorithms"
                  link="https://www.youtube.com/watch?v=t2CEgPsws3U"
                  buttonText="Watch Tutorial"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="mern" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ResourceCard 
                  title="MERN Stack Course"
                  description="Build full-stack applications with the MERN stack"
                  link="https://www.mongodb.com/mern-stack"
                />
                <ResourceCard 
                  title="React Documentation"
                  description="Official React documentation and tutorials"
                  link="https://react.dev/"
                />
                <ResourceCard 
                  title="MERN Stack Tutorial"
                  description="Learn how to build a complete MERN application"
                  link="https://www.youtube.com/watch?v=7CqJlxBYj-M"
                  buttonText="Watch Tutorial"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="cs" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ResourceCard 
                  title="CS50: Introduction to Computer Science"
                  description="Harvard's introduction to computer science"
                  link="https://cs50.harvard.edu/x/"
                />
                <ResourceCard 
                  title="MIT OpenCourseWare"
                  description="Free computer science courses from MIT"
                  link="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/"
                />
                <ResourceCard 
                  title="Computer Science Crash Course"
                  description="Fast-paced overview of computer science concepts"
                  link="https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo"
                  buttonText="Watch Playlist"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgrammingPage;
