import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, PlusCircle, Bot } from "lucide-react";
import RoadmapChatbot from "@/components/ai/RoadmapChatbot";

const Roadmap = () => {
  const [step, setStep] = useState(1);
  const [gradeLevel, setGradeLevel] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [goals, setGoals] = useState("");
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
                  Create Your Study Roadmap
                </h1>
                <p className="text-muted-foreground">
                  Answer a few questions to generate a personalized learning plan that fits your goals and learning style.
                </p>
              </div>
              <Button 
                variant={showAI ? "default" : "outline"} 
                className="self-start md:self-center"
                onClick={() => setShowAI(!showAI)}
              >
                <Bot className="mr-2 h-4 w-4" />
                {showAI ? "Hide AI Assistant" : "AI Assistant"}
              </Button>
            </div>

            {showAI ? (
              <div className="mb-8">
                <RoadmapChatbot />
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex items-center space-x-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      1
                    </div>
                    <div className="h-1 w-12 bg-muted flex-1"></div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      2
                    </div>
                    <div className="h-1 w-12 bg-muted flex-1"></div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      3
                    </div>
                    <div className="h-1 w-12 bg-muted flex-1"></div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      4
                    </div>
                  </div>
                </div>

                {step === 1 && (
                  <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle>Step 1: Tell us about your education level</CardTitle>
                      <CardDescription>
                        Select your current grade level or educational status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Select value={gradeLevel} onValueChange={setGradeLevel}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your grade level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="elementary">Elementary School (Grades K-5)</SelectItem>
                              <SelectItem value="middle">Middle School (Grades 6-8)</SelectItem>
                              <SelectItem value="high">High School (Grades 9-12)</SelectItem>
                              <SelectItem value="college">College/University</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => setStep(2)} disabled={!gradeLevel} className="transition-all">
                            Next
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 2 && (
                  <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle>Step 2: Select your subjects</CardTitle>
                      <CardDescription>
                        Choose the subjects you want to include in your roadmap
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Tabs defaultValue="common">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="common">Common</TabsTrigger>
                            <TabsTrigger value="stem">STEM</TabsTrigger>
                            <TabsTrigger value="humanities">Humanities</TabsTrigger>
                          </TabsList>
                          <TabsContent value="common" className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Card className="cursor-pointer hover:border-primary transition-colors hover:bg-primary/5">
                                <CardHeader className="p-4">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Mathematics</CardTitle>
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                  </div>
                                </CardHeader>
                              </Card>
                              <Card className="cursor-pointer hover:border-primary transition-colors hover:bg-primary/5">
                                <CardHeader className="p-4">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">English</CardTitle>
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                  </div>
                                </CardHeader>
                              </Card>
                              <Card className="cursor-pointer hover:border-primary transition-colors hover:bg-primary/5">
                                <CardHeader className="p-4">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Science</CardTitle>
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                  </div>
                                </CardHeader>
                              </Card>
                              <Card className="cursor-pointer hover:border-primary transition-colors hover:bg-primary/5">
                                <CardHeader className="p-4">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">History</CardTitle>
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                  </div>
                                </CardHeader>
                              </Card>
                            </div>
                          </TabsContent>
                          {/* Other tab contents would go here */}
                        </Tabs>
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setStep(1)}>
                            Back
                          </Button>
                          <Button onClick={() => setStep(3)}>
                            Next
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 3 && (
                  <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle>Step 3: What are your goals?</CardTitle>
                      <CardDescription>
                        Tell us what you hope to achieve with your study roadmap
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Textarea 
                          placeholder="e.g., Improve my math grades, Prepare for SAT, Learn coding skills..."
                          value={goals}
                          onChange={(e) => setGoals(e.target.value)}
                          rows={4}
                          className="resize-none"
                        />
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setStep(2)}>
                            Back
                          </Button>
                          <Button onClick={() => setStep(4)} disabled={!goals}>
                            Next
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 4 && (
                  <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle>Your Personalized Roadmap</CardTitle>
                      <CardDescription>
                        Based on your inputs, here's a customized study plan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="rounded-lg border p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                          <h3 className="font-bold text-lg mb-2">Mathematics</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Algebra Fundamentals</p>
                                <p className="text-sm text-muted-foreground">
                                  Master basic algebraic concepts and equations
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Geometry Essentials</p>
                                <p className="text-sm text-muted-foreground">
                                  Learn shapes, angles, and spatial relationships
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <PlusCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Add more topics</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                          <h3 className="font-bold text-lg mb-2">English</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Reading Comprehension</p>
                                <p className="text-sm text-muted-foreground">
                                  Develop critical reading and analysis skills
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Essay Writing</p>
                                <p className="text-sm text-muted-foreground">
                                  Structure and compose clear, persuasive essays
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <PlusCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Add more topics</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setStep(3)}>
                            Back
                          </Button>
                          <Button>
                            Save Roadmap
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Roadmap;
