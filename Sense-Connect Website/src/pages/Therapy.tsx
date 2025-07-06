
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, Check, UserPlus } from "lucide-react";
import { format } from "date-fns";

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Speech Therapy",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Occupational Therapy",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialization: "Physical Therapy",
    availability: ["Monday", "Thursday", "Friday"],
  },
  {
    id: 4,
    name: "Dr. James Taylor",
    specialization: "Behavioral Therapy",
    availability: ["Wednesday", "Friday", "Saturday"],
  },
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const TherapyPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTherapist, setSelectedTherapist] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
  const { toast } = useToast();

  const handleScheduleSession = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTherapist || !selectedTime || !name || !email || !agreeToTerms) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and agree to the terms.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, would save this to a database
    const newSession = {
      id: Date.now(),
      therapist: therapists.find(t => t.id.toString() === selectedTherapist)?.name || "Unknown",
      date: format(selectedDate, "MMMM d, yyyy"),
      time: selectedTime,
      notes: notes,
    };
    
    setUpcomingSessions([...upcomingSessions, newSession]);
    
    toast({
      title: "Session Scheduled",
      description: `Your session with ${newSession.therapist} on ${newSession.date} at ${newSession.time} has been confirmed.`,
    });
    
    setIsScheduled(true);
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTherapist("");
    setSelectedTime("");
    setNotes("");
    setAgreeToTerms(false);
  };
  
  const resetForm = () => {
    setIsScheduled(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Therapy Session Scheduler
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Schedule therapy sessions with our qualified professionals to support your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Scheduling Form */}
            <Card className="order-2 md:order-1">
              <CardHeader>
                <CardTitle>Schedule a Session</CardTitle>
              </CardHeader>
              <CardContent>
                {!isScheduled ? (
                  <form onSubmit={handleScheduleSession} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="therapist">Select Therapist</Label>
                      <Select
                        value={selectedTherapist}
                        onValueChange={setSelectedTherapist}
                      >
                        <SelectTrigger id="therapist">
                          <SelectValue placeholder="Select a therapist" />
                        </SelectTrigger>
                        <SelectContent>
                          {therapists.map((therapist) => (
                            <SelectItem key={therapist.id} value={therapist.id.toString()}>
                              {therapist.name} - {therapist.specialization}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="border rounded-md p-3"
                        disabled={(date) => {
                          // Disable weekends and past dates
                          return date < new Date() || 
                            date.getDay() === 0 || // Sunday
                            date.getDay() === 6;   // Saturday
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Select Time</Label>
                      <Select
                        value={selectedTime}
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Notes or Requirements</Label>
                      <Input 
                        id="notes" 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreeToTerms} 
                        onCheckedChange={(checked) => setAgreeToTerms(checked === true)} 
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the cancellation policy and understand that I need to provide at least 
                        24 hours notice for any changes.
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full mt-6">
                      Schedule Session
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="mx-auto bg-primary/10 h-20 w-20 rounded-full flex items-center justify-center">
                      <Check className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Session Scheduled!</h3>
                    <p className="text-muted-foreground">
                      Your therapy session has been scheduled successfully. You will receive a confirmation email shortly.
                    </p>
                    <Button onClick={resetForm} className="mt-4">
                      Schedule Another Session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Upcoming Sessions */}
            <Card className="order-1 md:order-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Your Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="mx-auto bg-muted h-16 w-16 rounded-full flex items-center justify-center">
                      <CalendarDays className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      You don't have any upcoming sessions scheduled.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <Card key={session.id} className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{session.therapist}</h4>
                              <div className="text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <CalendarDays className="h-3 w-3" />
                                  <span>{session.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{session.time}</span>
                                </div>
                              </div>
                              {session.notes && (
                                <p className="text-sm mt-2">{session.notes}</p>
                              )}
                            </div>
                            <div>
                              <Button variant="outline" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-2">Our Therapists</h4>
                  <div className="space-y-3">
                    {therapists.map((therapist) => (
                      <div key={therapist.id} className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <UserPlus className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h5 className="font-medium">{therapist.name}</h5>
                          <p className="text-sm text-muted-foreground">{therapist.specialization}</p>
                          <p className="text-xs text-muted-foreground">
                            Available: {therapist.availability.join(", ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      {/* Botpress Chat Integration */}
      <div id="bp-web-widget-container"></div>
    </div>
  );
};

export default TherapyPage;
