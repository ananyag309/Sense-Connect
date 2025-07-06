
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MicOff, Plus, Search, Tag, Trash2, Edit, Save } from "lucide-react";

const initialNotes = [
  {
    id: 1,
    title: "Math: Quadratic Equations",
    content: "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a. It's used to solve equations in the form ax² + bx + c = 0.",
    subject: "Mathematics",
    date: "2025-04-10",
    tags: ["algebra", "formulas"],
  },
  {
    id: 2,
    title: "English: Essay Structure",
    content: "Introduction (thesis statement), Body paragraphs (topic sentences, evidence, analysis), Conclusion (restate thesis, final thoughts).",
    subject: "English",
    date: "2025-04-08",
    tags: ["writing", "essays"],
  },
  {
    id: 3,
    title: "Science: Photosynthesis",
    content: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Plants convert carbon dioxide and water into glucose and oxygen using sunlight.",
    subject: "Science",
    date: "2025-04-05",
    tags: ["biology", "plants"],
  },
];

const NotesPage = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isRecording, setIsRecording] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    subject: "",
    tags: "",
  });
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [currentNote, setCurrentNote] = useState<any>(null);

  const handleAddNote = () => {
    const tagsArray = newNote.tags.split(",").map(tag => tag.trim()).filter(tag => tag);
    
    const newNoteObject = {
      id: notes.length + 1,
      title: newNote.title,
      content: newNote.content,
      subject: newNote.subject,
      date: new Date().toISOString().split("T")[0],
      tags: tagsArray,
    };
    
    setNotes([...notes, newNoteObject]);
    setNewNote({
      title: "",
      content: "",
      subject: "",
      tags: "",
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // This would connect to the Web Speech API in a real implementation
      console.log("Started recording...");
    } else {
      console.log("Stopped recording.");
      // Here we'd add the transcribed text to the note content
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (note: any) => {
    setEditingNoteId(note.id);
    setCurrentNote({
      ...note,
      tags: note.tags.join(", ")
    });
  };

  const handleSaveEdit = () => {
    const tagsArray = currentNote.tags.split(",").map((tag: string) => tag.trim()).filter((tag: string) => tag);
    
    const updatedNotes = notes.map(note => 
      note.id === editingNoteId ? 
      {
        ...note,
        title: currentNote.title,
        content: currentNote.content,
        subject: currentNote.subject,
        tags: tagsArray
      } : 
      note
    );
    
    setNotes(updatedNotes);
    setEditingNoteId(null);
    setCurrentNote(null);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFilter === "all") return matchesSearch;
    return note.subject.toLowerCase() === selectedFilter.toLowerCase() && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                My Notes
              </h1>
              <p className="text-muted-foreground max-w-3xl">
                Organize your thoughts and study materials with voice-to-text capabilities for easy note-taking.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Note
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create a New Note</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Note Title"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Textarea
                        placeholder="Note Content"
                        rows={6}
                        value={newNote.content}
                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={toggleRecording}
                        aria-label={isRecording ? "Stop recording" : "Start recording"}
                      >
                        {isRecording ? (
                          <MicOff className="h-5 w-5 text-destructive" />
                        ) : (
                          <Mic className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    {isRecording && (
                      <p className="text-sm text-primary animate-pulse">
                        Recording... Speak now
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Subject"
                        value={newNote.subject}
                        onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex">
                        <Input
                          placeholder="Tags (comma separated)"
                          value={newNote.tags}
                          onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                          className="rounded-r-none"
                        />
                        <Button variant="outline" className="rounded-l-none" aria-label="Tags">
                          <Tag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddNote} disabled={!newNote.title || !newNote.content}>
                    Add Note
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs defaultValue="all" value={selectedFilter} onValueChange={setSelectedFilter} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Mathematics">Math</TabsTrigger>
                <TabsTrigger value="English">English</TabsTrigger>
                <TabsTrigger value="Science">Science</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <Card key={note.id} className="transition-all hover:shadow-md">
                  {editingNoteId === note.id ? (
                    // Edit mode
                    <>
                      <CardHeader className="pb-2">
                        <Input
                          value={currentNote.title}
                          onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                          className="font-bold text-lg"
                        />
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={currentNote.content}
                          onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                          rows={4}
                          className="mb-4"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            value={currentNote.subject}
                            onChange={(e) => setCurrentNote({ ...currentNote, subject: e.target.value })}
                            placeholder="Subject"
                          />
                          <Input
                            value={currentNote.tags}
                            onChange={(e) => setCurrentNote({ ...currentNote, tags: e.target.value })}
                            placeholder="Tags (comma separated)"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingNoteId(null);
                            setCurrentNote(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleSaveEdit}
                        >
                          <Save className="h-4 w-4 mr-2" /> Save
                        </Button>
                      </CardFooter>
                    </>
                  ) : (
                    // View mode
                    <>
                      <CardHeader className="pb-2">
                        <CardTitle>{note.title}</CardTitle>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{note.subject}</span>
                          <span className="text-sm text-muted-foreground">{note.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{note.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {note.tags.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditNote(note)}
                          aria-label="Edit note"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive/90"
                          onClick={() => handleDeleteNote(note.id)}
                          aria-label="Delete note"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </>
                  )}
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted/50 rounded-full p-6 mb-4">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No notes found</h3>
                <p className="text-muted-foreground max-w-md">
                  {searchTerm ? 
                    `No notes match your search for "${searchTerm}". Try a different search term.` :
                    "You haven't created any notes yet. Click the 'New Note' button to get started."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotesPage;
