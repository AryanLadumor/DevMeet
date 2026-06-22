import React from "react";
import { Link } from "react-router-dom";

const ConnectionsCard = ({ user }) => {
  const { _id, firstName, lastName, photoURL, about, age, gender } = user;

  // Modern gender emblem assignment
  const getGenderIcon = (g) => {
    switch (g?.toLowerCase()) {
      case "male": return "♂";
      case "female": return "♀";
      default: return "⚧";
    }
  };

  return (
    <div className="card bg-base-200 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between p-5 group hover:border-primary/20">

      {/* Profile Info Header layout mapping */}
      <div className="flex gap-4 items-start min-w-0">
        {/* Aspect-stabilized Avatar Container frame wrapper */}
        <div className="avatar shrink-0">
          <div className="w-16 h-16 rounded-full ring-2 ring-base-300 group-hover:ring-primary/40 transition-[ring-color] duration-200 overflow-hidden bg-base-300">
            <img
              className="w-full h-full object-cover rounded-full"
              src={photoURL || "https://example.com/default-avatar.png"}
              alt={`Developer profile avatar of ${firstName}`}
              loading="lazy"
              width="64"
              height="64"
            />
          </div>
        </div>

        {/* Identity Information Details Stack context block */}
        <div className="flex flex-col min-w-0 flex-1">
          <h4 className="font-bold text-md text-base-content truncate tracking-tight">
            {firstName} {lastName}
          </h4>

          <div className="flex items-center gap-1.5 mt-0.5 text-xs font-semibold text-base-content/60 min-w-0">
            <span className="opacity-80" aria-hidden="true">{getGenderIcon(gender)}</span>
            <span className="capitalize truncate">{gender || "Developer"}</span>
            <span className="text-base-content/30" aria-hidden="true">•</span>
            <span className="shrink-0">{age || "—"} yrs</span>
          </div>
        </div>
      </div>

      {/* Connection Bio / Summary Block */}
      <div className="mt-4 flex-1 min-w-0">
        <p className="text-sm text-base-content/70 font-medium line-clamp-2 leading-relaxed min-h-[2.5rem] break-words">
          {about || "Hey there! Let's collaborate and build some cool code together."}
        </p>
      </div>

      {/* Primary Action Route Button triggers */}
      <div className="mt-5 pt-3 border-t border-base-300/40 w-full">
        <Link to={`/chat/${_id}`} className="block w-full" aria-label={`Send message to ${firstName}`}>
          <button className="btn btn-primary btn-sm w-full h-10 rounded-xl font-bold tracking-wide shadow-md shadow-primary/10 group-hover:shadow-primary/20 transition-[background-color,color,border-color,transform,box-shadow] duration-200 gap-1.5 focus-visible:ring-2 focus-visible:ring-primary/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-primary-content"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Message
          </button>
        </Link>
      </div>

    </div>
  );
};

export default ConnectionsCard;