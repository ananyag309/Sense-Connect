
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from "@clerk/clerk-react";
import { LanguageProvider } from "./context/LanguageContext";

const PUBLISHABLE_KEY = "pk_test_Y2hlZXJmdWwtaW1wLTgzLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      elements: {
        formButtonPrimary: 'bg-primary hover:bg-primary/90',
        footerActionLink: 'text-primary hover:text-primary/90',
      }
    }}
    afterSignInUrl="/dashboard"
    afterSignUpUrl="/dashboard"
  >
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ClerkProvider>
);
