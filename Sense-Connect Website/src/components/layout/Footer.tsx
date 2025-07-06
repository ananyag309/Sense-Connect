
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <span className="font-bold text-xl text-primary">UniqUs</span>
            <p className="mt-2 text-muted-foreground">
              Empowering all students to achieve their academic goals, with a focus 
              on accessibility and inclusivity.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-3">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/roadmap" className="text-muted-foreground hover:text-primary transition-colors">
                  Study Roadmap
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-muted-foreground hover:text-primary transition-colors">
                  Progress Tracker
                </Link>
              </li>
              <li>
                <Link to="/notes" className="text-muted-foreground hover:text-primary transition-colors">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-muted-foreground hover:text-primary transition-colors">
                  Important Dates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
