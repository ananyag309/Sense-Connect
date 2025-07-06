
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, Menu, User, Headphones } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import AccessibilityMenu from "./AccessibilityMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = React.useState<"light" | "dark" | "high-contrast">("light");
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { t } = useLanguage();

  const toggleTheme = () => {
    setTheme((current) => {
      const newTheme = current === "light" ? "dark" : 
                      current === "dark" ? "high-contrast" : "light";
      
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("high-contrast");
      } else if (newTheme === "high-contrast") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("dark", "high-contrast");
      }
      
      return newTheme;
    });
  };

  const openVapiAssistant = () => {
    if (window.vapiInstance) {
      window.vapiInstance.open({
        position: 'bottom-right',
        width: '400px',
        height: '600px'
      });
    }
  };

  const navigationLinks = [
    { name: t('home'), path: "/" },
    { name: t('dashboard'), path: "/dashboard", requiresAuth: true },
    { name: t('programming'), path: "/programming", requiresAuth: true },
    { name: t('resources'), path: "/resources", requiresAuth: true },
    { name: t('interview'), path: "/interview", requiresAuth: true },
    { name: t('videoCall'), path: "/video-conference", requiresAuth: true },
    { name: t('games'), path: "/games", requiresAuth: true }
  ];

  const filteredLinks = navigationLinks.filter(link => !link.requiresAuth || isSignedIn);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-primary">UniqUs</span>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <AccessibilityMenu />
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <SunIcon className="h-5 w-5" />
              ) : theme === "dark" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <span className="text-xs font-bold">HC</span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={openVapiAssistant}
              aria-label="AI Assistant"
            >
              <Headphones className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 pt-4">
                  {filteredLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  <SignedIn>
                    <div className="mt-2 mb-4">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <Link
                      to="/login"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {t('login')}
                    </Link>
                  </SignedOut>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              {filteredLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <AccessibilityMenu />
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <SunIcon className="h-5 w-5" />
              ) : theme === "dark" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <span className="text-xs font-bold">HC</span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={openVapiAssistant}
              aria-label="AI Assistant"
            >
              <Headphones className="h-5 w-5" />
            </Button>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Button asChild>
                <Link to="/login">{t('login')}</Link>
              </Button>
            </SignedOut>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
