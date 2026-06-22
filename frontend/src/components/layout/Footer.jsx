import React from "react";
import { Link } from "react-router-dom"; // Add this import

const Footer = () => {
  return (
    <footer className="w-full bg-base-200 border-t border-base-300 mt-auto py-5 px-4 transition-all duration-300">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sm text-base-content/60 font-medium">
        <aside className="flex items-center gap-2">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-serif font-black text-transparent bg-linear-to-r from-primary to-secondary bg-clip-text ml-1">
              Partner
            </span>
            . All rights reserved.
          </p>
        </aside>

        {/* Change these from <a> tags to <Link to="..."> tags */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs tracking-wide uppercase font-semibold">
          <Link to="/about" className="hover:text-primary transition-colors duration-200">
            About
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-primary transition-colors duration-200">
            Terms of Service
          </Link>
          <Link to="/support" className="hover:text-primary transition-colors duration-200">
            Support
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;