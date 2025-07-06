
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, BarChart3, LineChart, PieChart } from "lucide-react";
import { ResponsiveContainer, PieChart as RPieChart, Pie, Cell, BarChart as RBarChart, Bar, XAxis, YAxis, Tooltip, LineChart as RLineChart, Line, CartesianGrid } from "recharts";
import { Progress } from "@/components/ui/progress";

const subjects = [
  {
    name: "Mathematics",
    topics: [
      { name: "Algebra", completed: true },
      { name: "Geometry", completed: true },
      { name: "Trigonometry", completed: false },
      { name: "Calculus", completed: false },
    ],
    progress: 50,
  },
  {
    name: "English",
    topics: [
      { name: "Reading Comprehension", completed: true },
      { name: "Essay Writing", completed: true },
      { name: "Grammar", completed: true },
      { name: "Literature Analysis", completed: false },
    ],
    progress: 75,
  },
  {
    name: "Science",
    topics: [
      { name: "Biology", completed: true },
      { name: "Chemistry", completed: false },
      { name: "Physics", completed: false },
      { name: "Earth Science", completed: false },
    ],
    progress: 25,
  },
];

const weeklyData = [
  { name: "Mon", hours: 2 },
  { name: "Tue", hours: 3 },
  { name: "Wed", hours: 1 },
  { name: "Thu", hours: 4 },
  { name: "Fri", hours: 2 },
  { name: "Sat", hours: 5 },
  { name: "Sun", hours: 3 },
];

const monthlyData = [
  { name: "Jan", completion: 30 },
  { name: "Feb", completion: 45 },
  { name: "Mar", completion: 60 },
  { name: "Apr", completion: 75 },
  { name: "May", completion: 85 },
  { name: "Jun", completion: 90 },
];

const overallData = [
  { name: "Completed", value: 12 },
  { name: "In Progress", value: 8 },
  { name: "Not Started", value: 5 },
];

const COLORS = ["#6366F1", "#FFCA28", "#E0E0E0"];

const ProgressPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
            Your Learning Progress
          </h1>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Track your academic journey and celebrate your achievements. Visual metrics help you understand your progress and identify areas for improvement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie
                        data={overallData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#6366F1"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {overallData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Weekly Study Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RBarChart data={weeklyData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#6366F1" />
                    </RBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Monthly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RLineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="completion" stroke="#6366F1" />
                    </RLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="subjects" className="max-w-4xl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="subjects">By Subject</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="subjects" className="space-y-6 pt-6">
              {subjects.map((subject, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{subject.name}</CardTitle>
                      <span className="text-lg font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subject.topics.map((topic, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          {topic.completed ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span>{topic.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="achievements" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                  <CardHeader>
                    <div className="mx-auto bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                      <BarChart3 className="h-8 w-8 text-indigo-500" />
                    </div>
                    <CardTitle className="text-center">Fast Learner</CardTitle>
                    <CardDescription className="text-center">
                      Completed 5 topics in one week
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <CardHeader>
                    <div className="mx-auto bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                      <PieChart className="h-8 w-8 text-amber-500" />
                    </div>
                    <CardTitle className="text-center">Math Whiz</CardTitle>
                    <CardDescription className="text-center">
                      Mastered Algebra fundamentals
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                  <CardHeader>
                    <div className="mx-auto bg-emerald-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                      <LineChart className="h-8 w-8 text-emerald-500" />
                    </div>
                    <CardTitle className="text-center">Consistent</CardTitle>
                    <CardDescription className="text-center">
                      Studied every day for 2 weeks
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgressPage;
