
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, BookOpen, Code, BarChart4, FileEdit, Video, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Category = ({ 
  icon: Icon, 
  title, 
  description, 
  link 
}: { 
  icon: LucideIcon; 
  title: string; 
  description: string;
  link: string;
}) => (
  <Link to={link}>
    <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <Icon className="h-10 w-10 text-primary" />
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h2>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <Card className="mb-8 border-primary/20 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
                  <AvatarFallback>
                    {user.firstName?.charAt(0) || "U"}
                    {user.lastName?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold">{user.fullName || "User"}</h1>
                  <p className="text-muted-foreground">{user.emailAddresses[0]?.emailAddress}</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" /> Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="learning" className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="programming">Programming</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="learning" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Category 
                icon={BookOpen} 
                title="Study Roadmap" 
                description="Create your personalized learning plan" 
                link="/roadmap" 
              />
              <Category 
                icon={BarChart4} 
                title="Progress Tracker" 
                description="Monitor your academic journey" 
                link="/progress" 
              />
              <Category 
                icon={FileEdit} 
                title="Notes Section" 
                description="Take and organize your study notes" 
                link="/notes" 
              />
            </TabsContent>
            
            <TabsContent value="programming" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Category 
                icon={Code} 
                title="Java" 
                description="Learn Java programming fundamentals" 
                link="/programming/java" 
              />
              <Category 
                icon={Code} 
                title="Python" 
                description="Master Python development" 
                link="/programming/python" 
              />
              <Category 
                icon={Code} 
                title="C++" 
                description="Advance your C++ skills" 
                link="/programming/cpp" 
              />
              <Category 
                icon={Code} 
                title="Data Structures & Algorithms" 
                description="Problem solving techniques" 
                link="/programming/dsa" 
              />
              <Category 
                icon={Code} 
                title="MERN Stack" 
                description="Full-stack web development" 
                link="/programming/mern" 
              />
              <Category 
                icon={Code} 
                title="Computer Science" 
                description="Fundamental CS concepts" 
                link="/programming/cs" 
              />
            </TabsContent>
            
            <TabsContent value="interviews" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Category 
                icon={Video} 
                title="Mock Interviews" 
                description="Practice with AI-powered interviews" 
                link="/interview" 
              />
              <Category 
                icon={FileEdit} 
                title="Resume Builder" 
                description="Create and edit your professional resume" 
                link="/resume" 
              />
              <Category 
                icon={BookOpen} 
                title="Resources" 
                description="Curated materials for interview preparation" 
                link="/resources" 
              />
            </TabsContent>
            
            <TabsContent value="accessibility" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Category 
                icon={Video} 
                title="Video Conferencing" 
                description="Accessible video meetings" 
                link="/video-conference" 
              />
              <Category 
                icon={BookOpen} 
                title="Therapy Sessions" 
                description="Schedule and manage therapy appointments" 
                link="/therapy" 
              />
              <Category 
                icon={BarChart4} 
                title="Personalized Goals" 
                description="Track progress on individualized goals" 
                link="/goals" 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
