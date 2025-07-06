import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, Youtube, Github, Globe, Book, Bookmark } from "lucide-react";

const ResourceCard = ({ title, description, link, icon: Icon }) => (
  <Card className="h-full hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <Button asChild variant="outline" size="sm">
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Visit Resource <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const YoutubeCard = ({ title, channel, link, thumbnail }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="block group"
  >
    <Card className="h-full group-hover:border-primary transition-colors">
      <CardContent className="p-3">
        <div className="relative aspect-video rounded-md overflow-hidden mb-2">
          <img 
            src={thumbnail} 
            alt={title} 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Youtube className="h-10 w-10 text-white" />
          </div>
        </div>
        <h4 className="font-medium line-clamp-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{channel}</p>
      </CardContent>
    </Card>
  </a>
);

const ResourcesPage = () => {
  const generalResources = [
    {
      title: "Khan Academy",
      description: "Free online courses, lessons and practice in various subjects",
      link: "https://www.khanacademy.org/",
      icon: Globe
    },
    {
      title: "Coursera",
      description: "Online courses from top universities and companies",
      link: "https://www.coursera.org/",
      icon: Book
    },
    {
      title: "edX",
      description: "Free online courses from Harvard, MIT, and more",
      link: "https://www.edx.org/",
      icon: Book
    },
    {
      title: "MIT OpenCourseWare",
      description: "Free web-based publication of MIT course content",
      link: "https://ocw.mit.edu/",
      icon: Book
    }
  ];

  const programmingResources = [
    {
      title: "freeCodeCamp",
      description: "Learn to code for free with interactive tutorials",
      link: "https://www.freecodecamp.org/",
      icon: Code
    },
    {
      title: "The Odin Project",
      description: "Full stack curriculum completely free and open source",
      link: "https://www.theodinproject.com/",
      icon: Globe
    },
    {
      title: "MDN Web Docs",
      description: "Resources for developers, by developers",
      link: "https://developer.mozilla.org/",
      icon: Globe
    },
    {
      title: "GitHub Learning Lab",
      description: "Learn new skills by completing fun, realistic projects",
      link: "https://lab.github.com/",
      icon: Github
    }
  ];

  const interviewResources = [
    {
      title: "LeetCode",
      description: "Platform to help you enhance your skills and prepare for technical interviews",
      link: "https://leetcode.com/",
      icon: Code
    },
    {
      title: "HackerRank",
      description: "Practice coding challenges and prepare for interviews",
      link: "https://www.hackerrank.com/",
      icon: Code
    },
    {
      title: "InterviewBit",
      description: "Learn and practice on almost all coding interview questions asked historically",
      link: "https://www.interviewbit.com/",
      icon: Bookmark
    },
    {
      title: "Pramp",
      description: "Practice mock interviews with peers",
      link: "https://www.pramp.com/",
      icon: Globe
    }
  ];

  const youtubeChannels = [
    {
      title: "freeCodeCamp",
      channel: "freeCodeCamp.org",
      link: "https://www.youtube.com/c/FreeCodeCamp",
      thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg"
    },
    {
      title: "Traversy Media",
      channel: "Brad Traversy",
      link: "https://www.youtube.com/user/TechGuyWeb",
      thumbnail: "https://i.ytimg.com/vi/hdI2bqOjy3c/hqdefault.jpg"
    },
    {
      title: "The Net Ninja",
      channel: "Shaun Pelling",
      link: "https://www.youtube.com/c/TheNetNinja",
      thumbnail: "https://i.ytimg.com/vi/OxIDLw0M-m0/hqdefault.jpg"
    },
    {
      title: "Programming with Mosh",
      channel: "Mosh Hamedani",
      link: "https://www.youtube.com/c/programmingwithmosh",
      thumbnail: "https://i.ytimg.com/vi/eIrMbAQSU34/hqdefault.jpg"
    },
    {
      title: "Web Dev Simplified",
      channel: "Kyle Cook",
      link: "https://www.youtube.com/c/WebDevSimplified",
      thumbnail: "https://i.ytimg.com/vi/1PnVor36_40/hqdefault.jpg"
    },
    {
      title: "Fireship",
      channel: "Jeff Delaney",
      link: "https://www.youtube.com/c/Fireship",
      thumbnail: "https://i.ytimg.com/vi/Tn6-PIqc4UM/hqdefault.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Learning Resources
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Curated resources to help you in your learning journey.
            </p>
          </div>

          <Tabs defaultValue="general" className="mb-12">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="general">General Learning</TabsTrigger>
              <TabsTrigger value="programming">Programming</TabsTrigger>
              <TabsTrigger value="interview">Interview Prep</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generalResources.map((resource, index) => (
                  <ResourceCard 
                    key={index}
                    title={resource.title}
                    description={resource.description}
                    link={resource.link}
                    icon={resource.icon}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="programming" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programmingResources.map((resource, index) => (
                  <ResourceCard 
                    key={index}
                    title={resource.title}
                    description={resource.description}
                    link={resource.link}
                    icon={resource.icon}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="interview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {interviewResources.map((resource, index) => (
                  <ResourceCard 
                    key={index}
                    title={resource.title}
                    description={resource.description}
                    link={resource.link}
                    icon={resource.icon}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Youtube className="h-7 w-7 text-red-500" />
              Recommended YouTube Channels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {youtubeChannels.map((channel, index) => (
                <YoutubeCard 
                  key={index}
                  title={channel.title}
                  channel={channel.channel}
                  link={channel.link}
                  thumbnail={channel.thumbnail}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Code = (props) => <Globe {...props} />;

export default ResourcesPage;
