
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Briefcase, Search, Filter, MapPin, Calendar, ExternalLink, Bookmark, Clock } from "lucide-react";

interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  deadline: string;
  description: string;
  requirements: string[];
  link: string;
  saved: boolean;
}

const InternshipsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filters, setFilters] = useState({
    remote: false,
    fullTime: false,
    partTime: false,
    paid: false,
    unpaid: false,
    summer: false,
    fall: false,
    spring: false,
    winter: false,
  });
  const [savedInternships, setSavedInternships] = useState<number[]>([]);
  
  // Sample internship data
  const internships: Internship[] = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full-time",
      posted: "2 days ago",
      deadline: "Apr 30, 2025",
      description: "Join Google as a Software Engineering Intern to develop and improve products that are used by billions of people. You'll work on real projects, build your skills, and collaborate with some of the most innovative engineers in the industry.",
      requirements: [
        "Currently pursuing a Bachelor's degree in Computer Science or related field",
        "Programming experience in Python, Java, or C++",
        "Knowledge of data structures and algorithms"
      ],
      link: "https://careers.google.com/",
      saved: false
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "Microsoft",
      location: "Redmond, WA",
      type: "Full-time",
      posted: "1 week ago",
      deadline: "May 15, 2025",
      description: "Microsoft is looking for Data Science Interns to help solve complex problems using data analytics, machine learning, and AI. You'll work with big data and collaborate with cross-functional teams to derive insights that drive business decisions.",
      requirements: [
        "Currently pursuing a Master's degree in Data Science, Computer Science, or related field",
        "Experience with Python, R, or SQL",
        "Understanding of statistical analysis and machine learning concepts"
      ],
      link: "https://careers.microsoft.com/",
      saved: false
    },
    {
      id: 3,
      title: "UX Design Intern",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Full-time",
      posted: "3 days ago",
      deadline: "May 5, 2025",
      description: "Apple is seeking a UX Design Intern to join our team. You'll help create intuitive and engaging user experiences for Apple products. This is an opportunity to work with world-class designers and learn about user-centered design processes.",
      requirements: [
        "Currently pursuing a degree in Design, HCI, or related field",
        "Portfolio demonstrating UI/UX design skills",
        "Proficiency in design tools like Figma, Sketch, or Adobe XD"
      ],
      link: "https://www.apple.com/careers/",
      saved: false
    },
    {
      id: 4,
      title: "Marketing Intern",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Part-time",
      posted: "2 weeks ago",
      deadline: "May 20, 2025",
      description: "Amazon is looking for a Marketing Intern to support our marketing initiatives. You'll assist with campaign planning, content creation, and data analysis to help grow our customer base and improve marketing effectiveness.",
      requirements: [
        "Currently pursuing a degree in Marketing, Communications, or related field",
        "Strong written and verbal communication skills",
        "Experience with social media platforms and analytics tools"
      ],
      link: "https://www.amazon.jobs/",
      saved: false
    },
    {
      id: 5,
      title: "Machine Learning Research Intern",
      company: "Meta",
      location: "Remote",
      type: "Full-time",
      posted: "3 days ago",
      deadline: "Apr 25, 2025",
      description: "Meta is looking for Machine Learning Research Interns to join our AI research team. You'll work on cutting-edge research problems, implement and test novel algorithms, and contribute to advancing the state of the art in machine learning.",
      requirements: [
        "Currently pursuing a PhD in Computer Science, Machine Learning, or related field",
        "Strong research background with publications preferred",
        "Experience with deep learning frameworks like PyTorch or TensorFlow"
      ],
      link: "https://www.metacareers.com/",
      saved: false
    },
    {
      id: 6,
      title: "Finance Intern",
      company: "JP Morgan Chase",
      location: "New York, NY",
      type: "Full-time",
      posted: "1 week ago",
      deadline: "May 10, 2025",
      description: "JP Morgan Chase is seeking Finance Interns to join our team. You'll gain experience in financial analysis, forecasting, and reporting. This internship provides exposure to the financial services industry and opportunities to work on impactful projects.",
      requirements: [
        "Currently pursuing a degree in Finance, Economics, or related field",
        "Strong analytical and quantitative skills",
        "Proficiency in Excel and financial modeling"
      ],
      link: "https://careers.jpmorgan.com/",
      saved: false
    },
    {
      id: 7,
      title: "Frontend Developer Intern",
      company: "Netflix",
      location: "Los Gatos, CA",
      type: "Full-time",
      posted: "4 days ago",
      deadline: "May 1, 2025",
      description: "Netflix is looking for Frontend Developer Interns to help build and improve our web applications. You'll work with modern JavaScript frameworks to create responsive, accessible, and performant user interfaces that millions of people use every day.",
      requirements: [
        "Currently pursuing a degree in Computer Science or related field",
        "Experience with JavaScript, HTML, and CSS",
        "Familiarity with React, Vue, or Angular"
      ],
      link: "https://jobs.netflix.com/",
      saved: false
    },
    {
      id: 8,
      title: "Product Management Intern",
      company: "Airbnb",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "5 days ago",
      deadline: "May 15, 2025",
      description: "Airbnb is seeking Product Management Interns to help define and deliver product features. You'll work with cross-functional teams to understand user needs, prioritize requirements, and drive product development from concept to launch.",
      requirements: [
        "Currently pursuing a degree in Business, Computer Science, or related field",
        "Strong problem-solving and analytical skills",
        "Excellent communication and collaboration abilities"
      ],
      link: "https://careers.airbnb.com/",
      saved: false
    }
  ];
  
  // Toggle saved status
  const toggleSaved = (id: number) => {
    if (savedInternships.includes(id)) {
      setSavedInternships(savedInternships.filter(internshipId => internshipId !== id));
    } else {
      setSavedInternships([...savedInternships, id]);
    }
  };
  
  // Filter internships based on search query, location filter, and other filters
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = 
      locationFilter === "" || 
      internship.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesType = 
      (!filters.fullTime && !filters.partTime) || 
      (filters.fullTime && internship.type === "Full-time") || 
      (filters.partTime && internship.type === "Part-time");
    
    const matchesRemote = 
      !filters.remote || 
      internship.location.toLowerCase().includes("remote");
    
    // More complex filtering could be added here
    
    return matchesSearch && matchesLocation && matchesType && matchesRemote;
  });
  
  // Internships for the saved tab
  const savedInternshipList = internships.filter(internship => 
    savedInternships.includes(internship.id)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Internship Listings
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Find and apply for internships that match your skills and interests.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for internships by title, company, or keyword"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by location"
                  className="pl-10 w-full md:w-[200px]"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setLocationFilter("");
                  setFilters({
                    remote: false,
                    fullTime: false,
                    partTime: false,
                    paid: false,
                    unpaid: false,
                    summer: false,
                    fall: false,
                    spring: false,
                    winter: false,
                  });
                }}
              >
                Clear Filters
              </Button>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remote" 
                  checked={filters.remote} 
                  onCheckedChange={(checked) => setFilters({...filters, remote: checked === true})}
                />
                <Label htmlFor="remote">Remote</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="fullTime" 
                  checked={filters.fullTime} 
                  onCheckedChange={(checked) => setFilters({...filters, fullTime: checked === true})}
                />
                <Label htmlFor="fullTime">Full-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="partTime" 
                  checked={filters.partTime} 
                  onCheckedChange={(checked) => setFilters({...filters, partTime: checked === true})}
                />
                <Label htmlFor="partTime">Part-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="paid" 
                  checked={filters.paid} 
                  onCheckedChange={(checked) => setFilters({...filters, paid: checked === true})}
                />
                <Label htmlFor="paid">Paid</Label>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Internships</TabsTrigger>
              <TabsTrigger value="saved">Saved ({savedInternships.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filteredInternships.length > 0 ? (
                <div className="space-y-4">
                  {filteredInternships.map((internship) => (
                    <InternshipCard 
                      key={internship.id} 
                      internship={internship} 
                      saved={savedInternships.includes(internship.id)}
                      onSaveToggle={() => toggleSaved(internship.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No internships found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search filters or try a different search term.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              {savedInternshipList.length > 0 ? (
                <div className="space-y-4">
                  {savedInternshipList.map((internship) => (
                    <InternshipCard 
                      key={internship.id} 
                      internship={internship} 
                      saved={true}
                      onSaveToggle={() => toggleSaved(internship.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                    <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No saved internships</h3>
                    <p className="text-muted-foreground">
                      Save internships you're interested in to view them later.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Botpress Chat Integration */}
      <div id="bp-web-widget-container"></div>
    </div>
  );
};

interface InternshipCardProps {
  internship: Internship;
  saved: boolean;
  onSaveToggle: () => void;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship, saved, onSaveToggle }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-bold">{internship.title}</h3>
              <p className="text-lg">{internship.company}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onSaveToggle}
              className={saved ? "text-primary" : ""}
            >
              <Bookmark className="h-5 w-5" fill={saved ? "currentColor" : "none"} />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {internship.location}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {internship.type}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Posted {internship.posted}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Deadline: {internship.deadline}
            </Badge>
          </div>
          
          <p className="mt-4 text-muted-foreground">
            {internship.description}
          </p>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {internship.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button asChild className="flex items-center gap-1">
              <a href={internship.link} target="_blank" rel="noopener noreferrer">
                Apply Now <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternshipsPage;
