
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, Download, FileText, Award, GraduationCap, Briefcase, User, Mail, Phone, Globe, MapPin } from "lucide-react";

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
}

const ResumeBuilder = () => {
  const { toast } = useToast();
  
  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    summary: ''
  });
  
  // Education
  const [education, setEducation] = useState<Education[]>([]);
  const [newEducation, setNewEducation] = useState<Education>({
    id: '',
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  // Experience
  const [experience, setExperience] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Experience>({
    id: '',
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  // Skills
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Skill>({
    id: '',
    name: '',
    level: 'Intermediate'
  });
  
  // Templates
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  
  // Preview
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Handle personal info change
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };
  
  // Handle education form change
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };
  
  // Add education
  const handleAddEducation = () => {
    if (!newEducation.school || !newEducation.degree) {
      toast({
        description: "Please fill in at least the school and degree fields",
        variant: "destructive"
      });
      return;
    }
    
    const educationToAdd = {
      ...newEducation,
      id: Date.now().toString()
    };
    
    setEducation([...education, educationToAdd]);
    setNewEducation({
      id: '',
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    
    toast({
      description: "Education added successfully"
    });
  };
  
  // Delete education
  const handleDeleteEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
    toast({
      description: "Education removed"
    });
  };
  
  // Handle experience form change
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };
  
  // Handle experience checkbox change
  const handleExperienceCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewExperience({ ...newExperience, [name]: checked });
  };
  
  // Add experience
  const handleAddExperience = () => {
    if (!newExperience.title || !newExperience.company) {
      toast({
        description: "Please fill in at least the job title and company fields",
        variant: "destructive"
      });
      return;
    }
    
    const experienceToAdd = {
      ...newExperience,
      id: Date.now().toString()
    };
    
    setExperience([...experience, experienceToAdd]);
    setNewExperience({
      id: '',
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    
    toast({
      description: "Experience added successfully"
    });
  };
  
  // Delete experience
  const handleDeleteExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
    toast({
      description: "Experience removed"
    });
  };
  
  // Handle skill form change
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };
  
  // Add skill
  const handleAddSkill = () => {
    if (!newSkill.name) {
      toast({
        description: "Please enter a skill name",
        variant: "destructive"
      });
      return;
    }
    
    const skillToAdd = {
      ...newSkill,
      id: Date.now().toString()
    };
    
    setSkills([...skills, skillToAdd]);
    setNewSkill({
      id: '',
      name: '',
      level: 'Intermediate'
    });
    
    toast({
      description: "Skill added successfully"
    });
  };
  
  // Delete skill
  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
    toast({
      description: "Skill removed"
    });
  };
  
  // Toggle preview mode
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };
  
  // Generate PDF (placeholder)
  const handleDownloadResume = () => {
    toast({
      title: "Download Started",
      description: "Your resume is being prepared for download."
    });
    
    // In a real app, would use a library like jsPDF or react-pdf to generate a PDF
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your resume has been downloaded successfully."
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Resume Builder
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Create a professional resume to showcase your skills and experiences.
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <Button 
              variant={isPreviewMode ? "default" : "outline"} 
              onClick={togglePreviewMode}
              className="flex items-center gap-2"
            >
              {isPreviewMode ? "Edit Resume" : "Preview Resume"}
            </Button>
          </div>

          {!isPreviewMode ? (
            <Tabs defaultValue="personal" className="space-y-8">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              {/* Personal Info Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          name="fullName" 
                          value={personalInfo.fullName}
                          onChange={handlePersonalInfoChange}
                          placeholder="John Doe" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          placeholder="john.doe@example.com" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          placeholder="(123) 456-7890" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={personalInfo.address}
                          onChange={handlePersonalInfoChange}
                          placeholder="City, State" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input 
                          id="website" 
                          name="website" 
                          value={personalInfo.website}
                          onChange={handlePersonalInfoChange}
                          placeholder="www.yourportfolio.com" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea 
                        id="summary" 
                        name="summary" 
                        value={personalInfo.summary}
                        onChange={handlePersonalInfoChange}
                        placeholder="A brief summary of your professional background and skills" 
                        className="min-h-[120px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Education Tab */}
              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {education.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Added Education</h3>
                        {education.map((edu) => (
                          <Card key={edu.id} className="bg-muted/50">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{edu.school}</h4>
                                  <p className="text-sm">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                                  {(edu.startDate || edu.endDate) && (
                                    <p className="text-sm text-muted-foreground">
                                      {edu.startDate} {edu.endDate && `- ${edu.endDate}`}
                                    </p>
                                  )}
                                  {edu.description && (
                                    <p className="text-sm mt-2">{edu.description}</p>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteEducation(edu.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Add New Education</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="school">School/University</Label>
                          <Input 
                            id="school" 
                            name="school" 
                            value={newEducation.school}
                            onChange={handleEducationChange}
                            placeholder="University of California" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="degree">Degree</Label>
                          <Input 
                            id="degree" 
                            name="degree" 
                            value={newEducation.degree}
                            onChange={handleEducationChange}
                            placeholder="Bachelor of Science" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fieldOfStudy">Field of Study (Optional)</Label>
                          <Input 
                            id="fieldOfStudy" 
                            name="fieldOfStudy" 
                            value={newEducation.fieldOfStudy}
                            onChange={handleEducationChange}
                            placeholder="Computer Science" 
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input 
                              id="startDate" 
                              name="startDate" 
                              value={newEducation.startDate}
                              onChange={handleEducationChange}
                              placeholder="Sep 2018" 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="endDate">End Date (or expected)</Label>
                            <Input 
                              id="endDate" 
                              name="endDate" 
                              value={newEducation.endDate}
                              onChange={handleEducationChange}
                              placeholder="Jun 2022" 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea 
                          id="description" 
                          name="description" 
                          value={newEducation.description}
                          onChange={handleEducationChange}
                          placeholder="Relevant courses, achievements, or activities" 
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <Button onClick={handleAddEducation} className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Work Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experience.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Added Experience</h3>
                        {experience.map((exp) => (
                          <Card key={exp.id} className="bg-muted/50">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{exp.title}</h4>
                                  <p className="text-sm">{exp.company} {exp.location && `- ${exp.location}`}</p>
                                  {(exp.startDate || exp.endDate) && (
                                    <p className="text-sm text-muted-foreground">
                                      {exp.startDate} {exp.current ? "- Present" : exp.endDate && `- ${exp.endDate}`}
                                    </p>
                                  )}
                                  {exp.description && (
                                    <p className="text-sm mt-2">{exp.description}</p>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteExperience(exp.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Add New Experience</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Job Title</Label>
                          <Input 
                            id="title" 
                            name="title" 
                            value={newExperience.title}
                            onChange={handleExperienceChange}
                            placeholder="Software Engineer" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input 
                            id="company" 
                            name="company" 
                            value={newExperience.company}
                            onChange={handleExperienceChange}
                            placeholder="Google" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="location">Location (Optional)</Label>
                          <Input 
                            id="location" 
                            name="location" 
                            value={newExperience.location}
                            onChange={handleExperienceChange}
                            placeholder="Mountain View, CA" 
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input 
                              id="startDate" 
                              name="startDate" 
                              value={newExperience.startDate}
                              onChange={handleExperienceChange}
                              placeholder="Jan 2020" 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input 
                              id="endDate" 
                              name="endDate" 
                              value={newExperience.endDate}
                              onChange={handleExperienceChange}
                              placeholder="Dec 2022" 
                              disabled={newExperience.current}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="current"
                          name="current"
                          checked={newExperience.current}
                          onChange={handleExperienceCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="current" className="text-sm">I currently work here</Label>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea 
                          id="description" 
                          name="description" 
                          value={newExperience.description}
                          onChange={handleExperienceChange}
                          placeholder="Describe your responsibilities, achievements, or projects" 
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <Button onClick={handleAddExperience} className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {skills.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Added Skills</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {skills.map((skill) => (
                            <div key={skill.id} className="flex items-center justify-between bg-muted/50 rounded-md p-3">
                              <div>
                                <span className="font-medium">{skill.name}</span>
                                <span className="ml-2 text-sm text-muted-foreground">({skill.level})</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteSkill(skill.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Add New Skill</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Skill Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={newSkill.name}
                            onChange={handleSkillChange}
                            placeholder="JavaScript" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="level">Proficiency Level</Label>
                          <select
                            id="level"
                            name="level"
                            value={newSkill.level}
                            onChange={handleSkillChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                      </div>
                      
                      <Button onClick={handleAddSkill} className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Add Skill
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Templates Tab */}
              <TabsContent value="templates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Resume Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`border rounded-md p-4 cursor-pointer transition-colors ${selectedTemplate === 'modern' ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}
                        onClick={() => setSelectedTemplate('modern')}
                      >
                        <div className="aspect-[8.5/11] bg-card rounded-md border mb-3 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Modern Template</span>
                        </div>
                        <h4 className="text-sm font-medium text-center">Modern</h4>
                      </div>
                      
                      <div 
                        className={`border rounded-md p-4 cursor-pointer transition-colors ${selectedTemplate === 'classic' ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}
                        onClick={() => setSelectedTemplate('classic')}
                      >
                        <div className="aspect-[8.5/11] bg-card rounded-md border mb-3 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Classic Template</span>
                        </div>
                        <h4 className="text-sm font-medium text-center">Classic</h4>
                      </div>
                      
                      <div 
                        className={`border rounded-md p-4 cursor-pointer transition-colors ${selectedTemplate === 'creative' ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}
                        onClick={() => setSelectedTemplate('creative')}
                      >
                        <div className="aspect-[8.5/11] bg-card rounded-md border mb-3 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Creative Template</span>
                        </div>
                        <h4 className="text-sm font-medium text-center">Creative</h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl mx-auto">
                    {/* Modern Template Preview */}
                    {selectedTemplate === 'modern' && (
                      <div className="space-y-6">
                        <div className="border-b pb-4">
                          <h1 className="text-3xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                            {personalInfo.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                <span>{personalInfo.email}</span>
                              </div>
                            )}
                            {personalInfo.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <span>{personalInfo.phone}</span>
                              </div>
                            )}
                            {personalInfo.address && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{personalInfo.address}</span>
                              </div>
                            )}
                            {personalInfo.website && (
                              <div className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                <span>{personalInfo.website}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {personalInfo.summary && (
                          <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Professional Summary</h2>
                            <p className="text-sm">{personalInfo.summary}</p>
                          </div>
                        )}
                        
                        {experience.length > 0 && (
                          <div className="space-y-3">
                            <h2 className="text-lg font-semibold">Experience</h2>
                            {experience.map((exp) => (
                              <div key={exp.id} className="space-y-1">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{exp.title}</h3>
                                  <span className="text-sm text-muted-foreground">
                                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                  </span>
                                </div>
                                <p className="text-sm">{exp.company} {exp.location && `• ${exp.location}`}</p>
                                {exp.description && <p className="text-sm">{exp.description}</p>}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {education.length > 0 && (
                          <div className="space-y-3">
                            <h2 className="text-lg font-semibold">Education</h2>
                            {education.map((edu) => (
                              <div key={edu.id} className="space-y-1">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{edu.school}</h3>
                                  <span className="text-sm text-muted-foreground">
                                    {edu.startDate} {edu.endDate && `- ${edu.endDate}`}
                                  </span>
                                </div>
                                <p className="text-sm">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                                {edu.description && <p className="text-sm">{edu.description}</p>}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {skills.length > 0 && (
                          <div className="space-y-3">
                            <h2 className="text-lg font-semibold">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                              {skills.map((skill) => (
                                <span 
                                  key={skill.id} 
                                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                                >
                                  {skill.name} {skill.level !== 'Intermediate' && `(${skill.level})`}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Classic Template Preview */}
                    {selectedTemplate === 'classic' && (
                      <div className="space-y-6">
                        <div className="text-center mb-4">
                          <h1 className="text-2xl font-bold uppercase tracking-wider">{personalInfo.fullName || "Your Name"}</h1>
                          <div className="flex justify-center flex-wrap gap-4 mt-2 text-sm">
                            {personalInfo.email && <span>{personalInfo.email}</span>}
                            {personalInfo.phone && <span>{personalInfo.phone}</span>}
                            {personalInfo.address && <span>{personalInfo.address}</span>}
                            {personalInfo.website && <span>{personalInfo.website}</span>}
                          </div>
                        </div>
                        
                        {personalInfo.summary && (
                          <div>
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b pb-1 mb-2">Objective</h2>
                            <p className="text-sm">{personalInfo.summary}</p>
                          </div>
                        )}
                        
                        {experience.length > 0 && (
                          <div>
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b pb-1 mb-2">Professional Experience</h2>
                            {experience.map((exp) => (
                              <div key={exp.id} className="mb-3">
                                <div className="flex justify-between mb-1">
                                  <h3 className="font-semibold">{exp.company}</h3>
                                  <span className="text-sm">
                                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                  </span>
                                </div>
                                <p className="text-sm font-medium">{exp.title} {exp.location && `• ${exp.location}`}</p>
                                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {education.length > 0 && (
                          <div>
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b pb-1 mb-2">Education</h2>
                            {education.map((edu) => (
                              <div key={edu.id} className="mb-3">
                                <div className="flex justify-between mb-1">
                                  <h3 className="font-semibold">{edu.school}</h3>
                                  <span className="text-sm">
                                    {edu.startDate} {edu.endDate && `- ${edu.endDate}`}
                                  </span>
                                </div>
                                <p className="text-sm">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {skills.length > 0 && (
                          <div>
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b pb-1 mb-2">Skills</h2>
                            <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                              {skills.map((skill) => (
                                <div key={skill.id}>
                                  {skill.name} {skill.level !== 'Intermediate' && `(${skill.level})`}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Creative Template Preview */}
                    {selectedTemplate === 'creative' && (
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-1 bg-primary/10 p-4 rounded-md">
                          <div className="text-center mb-6">
                            <h1 className="text-xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
                            <div className="space-y-2 mt-4 text-sm">
                              {personalInfo.email && (
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  <span>{personalInfo.email}</span>
                                </div>
                              )}
                              {personalInfo.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  <span>{personalInfo.phone}</span>
                                </div>
                              )}
                              {personalInfo.address && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{personalInfo.address}</span>
                                </div>
                              )}
                              {personalInfo.website && (
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  <span>{personalInfo.website}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {skills.length > 0 && (
                            <div className="mb-6">
                              <h2 className="text-lg font-semibold mb-2">Skills</h2>
                              <div className="space-y-2">
                                {skills.map((skill) => (
                                  <div key={skill.id} className="text-sm">
                                    <div className="flex justify-between">
                                      <span>{skill.name}</span>
                                      <span>{skill.level}</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                                      <div 
                                        className="bg-primary h-1.5 rounded-full" 
                                        style={{ 
                                          width: skill.level === 'Beginner' ? '25%' : 
                                                skill.level === 'Intermediate' ? '50%' : 
                                                skill.level === 'Advanced' ? '75%' : '100%' 
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {education.length > 0 && (
                            <div>
                              <h2 className="text-lg font-semibold mb-2">Education</h2>
                              <div className="space-y-3">
                                {education.map((edu) => (
                                  <div key={edu.id} className="text-sm">
                                    <h3 className="font-medium">{edu.school}</h3>
                                    <p>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                                    <p className="text-muted-foreground">
                                      {edu.startDate} {edu.endDate && `- ${edu.endDate}`}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="col-span-2 p-4">
                          {personalInfo.summary && (
                            <div className="mb-6">
                              <h2 className="text-lg font-semibold mb-2">About Me</h2>
                              <p className="text-sm">{personalInfo.summary}</p>
                            </div>
                          )}
                          
                          {experience.length > 0 && (
                            <div>
                              <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
                              <div className="space-y-4">
                                {experience.map((exp) => (
                                  <div key={exp.id} className="relative pl-6 pb-4 border-l border-muted">
                                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 top-1"></div>
                                    <div className="space-y-1">
                                      <div className="flex justify-between">
                                        <h3 className="font-medium">{exp.title}</h3>
                                        <span className="text-xs text-muted-foreground">
                                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                        </span>
                                      </div>
                                      <p className="text-sm">{exp.company} {exp.location && `• ${exp.location}`}</p>
                                      {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button onClick={handleDownloadResume} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Botpress Chat Integration */}
      <div id="bp-web-widget-container"></div>
    </div>
  );
};

export default ResumeBuilder;
