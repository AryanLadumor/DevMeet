import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-base-200 border-t border-base-300 mt-auto py-5 px-4 transition-all duration-300">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sm text-base-content/60 font-medium">
        <aside className="flex items-center gap-2">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-serif font-black text-transparent bg-linear-to-r from-primary to-secondary bg-clip-text ml-1">
              DevMeet
            </span>
            . All rights reserved.
          </p>
        </aside>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs tracking-wide uppercase font-semibold">
          <a
            href="#"
            className="hover:text-primary transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors duration-200"
          >
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
