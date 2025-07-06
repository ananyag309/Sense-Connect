
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call to authenticate the user
    if (activeTab === "login") {
      if (formData.email && formData.password) {
        toast({
          title: "Logged in successfully",
          description: "Welcome back to your learning journey!",
        });
      }
    } else {
      if (formData.name && formData.email && formData.password) {
        toast({
          title: "Account created successfully",
          description: "Welcome to your learning journey!",
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-primary/20 shadow-xl">
      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="your@email.com" 
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs" type="button">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input 
                  id="register-name" 
                  name="name"
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  name="email"
                  type="email" 
                  placeholder="your@email.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Input 
                    id="register-password" 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Button variant="link" className="h-auto p-0 text-xs">Terms of Service</Button>
            {" "}and{" "}
            <Button variant="link" className="h-auto p-0 text-xs">Privacy Policy</Button>.
          </p>
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default LoginForm;
