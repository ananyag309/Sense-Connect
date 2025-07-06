
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Video, VideoOff, MicOff, Book, ListChecks, ExternalLink, Youtube, Globe, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AIInterviewPrep = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isInterviewActive, setIsInterviewActive] = useState(false);

  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleCamera = () => setIsCameraOn(!isCameraOn);

  const startInterview = () => {
    setIsInterviewActive(true);
    setCurrentQuestion("Tell me about yourself and your background in this field.");
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setCurrentQuestion("");
  };

  const resources = [
    {
      title: "Technical Interview Handbook",
      description: "Carefully curated content to help you ace your next technical interview",
      link: "https://www.techinterviewhandbook.org/",
      icon: Book
    },
    {
      title: "LeetCode Patterns",
      description: "Curated list of common patterns for coding interviews",
      link: "https://github.com/seanprashad/leetcode-patterns",
      icon: Github
    },
    {
      title: "System Design Primer",
      description: "Learn how to design large-scale systems for interviews",
      link: "https://github.com/donnemartin/system-design-primer",
      icon: Github
    },
    {
      title: "Pramp",
      description: "Practice mock interviews with peers",
      link: "https://www.pramp.com/",
      icon: Globe
    }
  ];

  const youtubeResources = [
    {
      title: "Grokking the Coding Interview",
      channel: "Design Gurus",
      link: "https://www.youtube.com/watch?v=xFcaQNxynxc",
      thumbnail: "https://i.ytimg.com/vi/xFcaQNxynxc/hqdefault.jpg"
    },
    {
      title: "FAANG Coding Interview Question",
      channel: "TechLead",
      link: "https://www.youtube.com/watch?v=B-bhYMRuHyM",
      thumbnail: "https://i.ytimg.com/vi/B-bhYMRuHyM/hqdefault.jpg"
    },
    {
      title: "How to Pass System Design Interview",
      channel: "ByteByteGo",
      link: "https://www.youtube.com/watch?v=MbjObHmDbZo",
      thumbnail: "https://i.ytimg.com/vi/MbjObHmDbZo/hqdefault.jpg"
    },
    {
      title: "Behavioral Interview Tips",
      channel: "Jeff H Sipe",
      link: "https://www.youtube.com/watch?v=BN8k-n3LK7s",
      thumbnail: "https://i.ytimg.com/vi/BN8k-n3LK7s/hqdefault.jpg"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Tabs defaultValue="interview" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="interview">Interview Practice</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="interview">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle>AI Interview Simulator</CardTitle>
                <CardDescription>
                  Practice your interview skills with our AI interviewer. Choose your field and difficulty level.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  {isInterviewActive ? (
                    <div className="bg-muted p-4 rounded-md mb-4">
                      <p className="font-medium">Current Question:</p>
                      <p className="mt-2">{currentQuestion}</p>
                    </div>
                  ) : (
                    <div className="bg-muted p-4 rounded-md mb-4 text-center">
                      <p>Click "Start Interview" to begin your practice session</p>
                    </div>
                  )}
                  
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center mb-4">
                    {isCameraOn ? (
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 flex items-center justify-center">
                        <p className="text-white">Camera Preview</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-white">
                        <VideoOff className="h-10 w-10 mb-2" />
                        <p>Camera is off</p>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant={isCameraOn ? "default" : "outline"}
                        onClick={toggleCamera}
                        className="rounded-full h-10 w-10 p-0"
                        aria-label={isCameraOn ? "Turn camera off" : "Turn camera on"}
                      >
                        {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                      </Button>
                      <Button
                        size="sm"
                        variant={isMicOn ? "default" : "outline"}
                        onClick={toggleMic}
                        className="rounded-full h-10 w-10 p-0"
                        aria-label={isMicOn ? "Turn microphone off" : "Turn microphone on"}
                      >
                        {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                {isInterviewActive ? (
                  <Button variant="destructive" onClick={endInterview}>
                    End Interview
                  </Button>
                ) : (
                  <Button onClick={startInterview}>
                    Start Interview
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Interview Tips</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-primary" />
                      Preparation Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">1</Badge>
                        <span>Research the company thoroughly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">2</Badge>
                        <span>Prepare your "Tell me about yourself" response</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">3</Badge>
                        <span>Review common questions for your role</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">4</Badge>
                        <span>Prepare examples using the STAR method</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">5</Badge>
                        <span>Prepare thoughtful questions for interviewers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Mic className="h-5 w-5 text-primary" />
                      Communication Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">1</Badge>
                        <span>Speak clearly and at a moderate pace</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">2</Badge>
                        <span>Use the STAR method for behavioral questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">3</Badge>
                        <span>Think before answering difficult questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">4</Badge>
                        <span>Ask clarifying questions when needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">5</Badge>
                        <span>Make eye contact and show engagement</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Youtube className="h-6 w-6 text-red-500" />
                  YouTube Video Resources
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {youtubeResources.map((resource, index) => (
                    <a 
                      key={index} 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <Card className="h-full group-hover:border-primary transition-colors">
                        <CardContent className="p-3">
                          <div className="relative aspect-video rounded-md overflow-hidden mb-2">
                            <img 
                              src={resource.thumbnail} 
                              alt={resource.title} 
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="h-10 w-10 text-white" />
                            </div>
                          </div>
                          <h4 className="font-medium line-clamp-1">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">{resource.channel}</p>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Book className="h-6 w-6 text-primary" />
                  Essential Resources
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <Card key={index} className="h-full">
                      <CardContent className="p-4 flex gap-4 items-start">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <resource.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                          <a 
                            href={resource.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            Visit Resource <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle>Chat with AI Assistant</CardTitle>
            <CardDescription>
              Ask questions about interview preparation, get feedback, or practice answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-muted/30 rounded-md p-4 flex items-center justify-center text-center">
              <div>
                <p className="text-muted-foreground mb-4">AI Assistant integration goes here</p>
                
                <Button id="vapi-ai-assistant-button">
                  Chat with Assistant
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIInterviewPrep;
