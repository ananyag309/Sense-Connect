
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarClock, Calendar as CalendarIcon, Clock, Plus, Bell, ArrowRight, Trash2, Clock3 } from "lucide-react";
import { format } from "date-fns";

const initialEvents = [
  {
    id: 1,
    title: "Math Quiz",
    description: "Algebra II - Quadratic Equations",
    date: "2025-04-15",
    time: "10:00",
    type: "exam",
    reminder: "1 day",
  },
  {
    id: 2,
    title: "English Essay",
    description: "Analysis of 'To Kill a Mockingbird'",
    date: "2025-04-20",
    time: "23:59",
    type: "assignment",
    reminder: "2 days",
  },
  {
    id: 3,
    title: "Science Project",
    description: "Renewable Energy Presentation",
    date: "2025-04-25",
    time: "14:30",
    type: "project",
    reminder: "3 days",
  },
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [viewType, setViewType] = useState("month");
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "12:00",
    type: "assignment",
    reminder: "1 day",
  });

  const handleAddEvent = () => {
    const newEventObject = {
      id: events.length + 1,
      ...newEvent,
    };
    
    setEvents([...events, newEventObject]);
    setNewEvent({
      title: "",
      description: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "12:00",
      type: "assignment",
      reminder: "1 day",
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Get events for the selected date
  const selectedDateEvents = date 
    ? events.filter(event => event.date === format(date, "yyyy-MM-dd"))
    : [];

  // Get upcoming events (next 7 days)
  const today = new Date();
  const oneWeekLater = new Date();
  oneWeekLater.setDate(today.getDate() + 7);
  
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= oneWeekLater;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Function to determine which dates have events (for calendar highlighting)
  const isDayWithEvent = (day: Date) => {
    const formattedDay = format(day, "yyyy-MM-dd");
    return events.some(event => event.date === formattedDay);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Important Dates
              </h1>
              <p className="text-muted-foreground max-w-3xl">
                Keep track of your assignments, exams, and important deadlines.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add a New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Event Title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex">
                        <Input
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          className="rounded-r-none"
                        />
                        <Button variant="outline" className="rounded-l-none" aria-label="Select date">
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex">
                        <Input
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                          className="rounded-r-none"
                        />
                        <Button variant="outline" className="rounded-l-none" aria-label="Select time">
                          <Clock className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Select 
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Event Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="exam">Exam</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Select 
                        value={newEvent.reminder}
                        onValueChange={(value) => setNewEvent({ ...newEvent, reminder: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Reminder" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No reminder</SelectItem>
                          <SelectItem value="30 minutes">30 minutes before</SelectItem>
                          <SelectItem value="1 hour">1 hour before</SelectItem>
                          <SelectItem value="1 day">1 day before</SelectItem>
                          <SelectItem value="2 days">2 days before</SelectItem>
                          <SelectItem value="1 week">1 week before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddEvent} disabled={!newEvent.title || !newEvent.date}>
                    Add Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Calendar</CardTitle>
                    <Tabs 
                      value={viewType} 
                      onValueChange={setViewType} 
                      className="w-auto"
                    >
                      <TabsList className="grid w-[200px] grid-cols-2">
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="mx-auto"
                    modifiers={{
                      hasEvent: (day) => isDayWithEvent(day),
                    }}
                    modifiersClassNames={{
                      hasEvent: "bg-primary/10 text-primary font-bold",
                    }}
                  />
                </CardContent>
              </Card>

              {selectedDateEvents.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Events for {date && format(date, "MMMM d, yyyy")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedDateEvents.map(event => (
                        <div 
                          key={event.id} 
                          className="flex justify-between items-start border-l-4 pl-4 py-2"
                          style={{ 
                            borderColor: 
                              event.type === 'exam' ? 'rgb(239, 68, 68)' : 
                              event.type === 'assignment' ? 'rgb(99, 102, 241)' : 
                              event.type === 'project' ? 'rgb(16, 185, 129)' : 
                              'rgb(234, 179, 8)' 
                          }}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">{event.title}</h3>
                              <Badge variant="outline" className="capitalize">{event.type}</Badge>
                            </div>
                            <p className="text-muted-foreground">{event.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock3 className="h-3 w-3 mr-1" />
                                {event.time}
                              </div>
                              {event.reminder !== 'none' && (
                                <div className="flex items-center">
                                  <Bell className="h-3 w-3 mr-1" />
                                  Reminder: {event.reminder} before
                                </div>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => handleDeleteEvent(event.id)}
                            aria-label="Delete event"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events in the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <div 
                          key={event.id} 
                          className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="bg-primary/10 text-primary rounded-lg p-2 flex flex-col items-center justify-center min-w-[60px]">
                            <span className="text-xs">{format(new Date(event.date), "MMM")}</span>
                            <span className="text-xl font-bold">{format(new Date(event.date), "dd")}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{event.title}</h3>
                              <Badge 
                                variant="outline" 
                                className={`capitalize ${
                                  event.type === 'exam' ? 'border-red-300 bg-red-50 text-red-600' : 
                                  event.type === 'assignment' ? 'border-indigo-300 bg-indigo-50 text-indigo-600' : 
                                  event.type === 'project' ? 'border-emerald-300 bg-emerald-50 text-emerald-600' : 
                                  'border-yellow-300 bg-yellow-50 text-yellow-600'
                                }`}
                              >
                                {event.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <CalendarClock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No upcoming events in the next 7 days</p>
                      <Button variant="outline" className="mt-4" asChild>
                        <DialogTrigger>
                          Add Event <Plus className="ml-2 h-4 w-4" />
                        </DialogTrigger>
                      </Button>
                    </div>
                  )}
                </CardContent>
                {upcomingEvents.length > 0 && (
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/all-events">
                        View All Events <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Add this component at the end of the file
const Link = ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: any }) => (
  <span className="cursor-pointer" {...props}>
    {children}
  </span>
);

export default CalendarPage;
