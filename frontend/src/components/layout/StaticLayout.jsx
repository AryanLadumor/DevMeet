import React from "react";
import { Link } from "react-router-dom";

const StaticLayout = ({ title, badge, children }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-fadeIn">
      {/* Top Breadcrumb Navigation */}
      <div className="mb-6 border-b border-base-300 pb-5">
        <Link 
          to="/" 
          className="text-xs font-bold text-primary uppercase tracking-widest hover:text-primary-focus transition-colors flex items-center gap-1.5"
        >
          <span>‹</span> Back to Discover Feed
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <h1 className="text-3xl font-serif font-black tracking-tight text-base-content">
            {title}
          </h1>
          {badge && (
            <span className="badge badge-md bg-base-200 border-base-300 font-bold uppercase tracking-widest text-[10px] sm:self-center self-start px-3 py-3 shadow-xs">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Main Document Body */}
      <div className="bg-base-200 border border-base-300 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 text-base-content/80 font-medium leading-relaxed text-sm sm:text-base">
        {children}
      </div>
    </div>
  );
};

export default StaticLayout;