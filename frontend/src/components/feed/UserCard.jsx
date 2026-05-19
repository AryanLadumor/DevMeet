import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../store/feedSlice";
import apiCall from "../../utils/axiosInstance";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoURL, about, skills } =
    user;
  const dispatch = useDispatch();

  const [cardState, setCardState] = useState("enter"); // enter, idle, swipe-left, swipe-right
  const [loadingAction, setLoadingAction] = useState(null); // 'ignored' or 'interested'

  // Trigger smooth arrival animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setCardState("idle"), 50);
    return () => clearTimeout(timer);
  }, [_id]);

  const handleAction = async (status) => {
    if (cardState.startsWith("swipe") || loadingAction) return;

    setLoadingAction(status);
    // Trigger visual swipe transition
    setCardState(status === "ignored" ? "swipe-left" : "swipe-right");

    try {
      await apiCall.post(`/request/send/${status}/${_id}`);
      // Wait for the CSS animation to complete before pulling from Redux
      setTimeout(() => {
        dispatch(removeUserFromFeed(_id));
      }, 350);
    } catch (error) {
      console.error(`Error sending request:`, error);
      // Revert if API fails
      setCardState("idle");
      setLoadingAction(null);
    }
  };

  // Modern gender emblem assignment
  const getGenderEmblem = (g) => {
    switch (g?.toLowerCase()) {
      case "male":
        return { icon: "♂", style: "badge-primary" };
      case "female":
        return { icon: "♀", style: "badge-secondary" };
      default:
        return { icon: "⚧", style: "badge-ghost" };
    }
  };

  const emblem = getGenderEmblem(gender);

  // Dynamic classes for hardware-accelerated card movements
  const getCardClasses = () => {
    const base =
      "card w-full max-w-sm bg-base-200 border border-base-300 shadow-2xl overflow-hidden transition-all duration-300 ease-out";
    if (cardState === "enter")
      return `${base} opacity-0 translate-y-8 scale-95`;
    if (cardState === "swipe-left")
      return `${base} opacity-0 -translate-x-[140%] rotate-[-15deg] pointer-events-none`;
    if (cardState === "swipe-right")
      return `${base} opacity-0 translate-x-[140%] rotate-[15deg] pointer-events-none`;
    return `${base} opacity-100 translate-y-0 scale-100`;
  };

  return (
    <div className="w-full flex justify-center px-2 py-4">
      <div className={getCardClasses()} style={{ height: "540px" }}>
        {/* Profile Image Section */}
        <div className="relative h-1/2 w-full bg-base-300 shrink-0">
          <img
            src={photoURL || "https://example.com/default-avatar.png"}
            alt={`${firstName}'s avatar`}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="eager"
          />

          {/* Subtle gradient scrim over picture for visual depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent opacity-60" />

          {/* Core Descriptive Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <span
              className={`badge ${emblem.style} font-bold tracking-wide shadow-md px-2.5 py-1 text-xs gap-1`}
            >
              {emblem.icon} {gender || "Developer"}
            </span>
            <span className="badge bg-neutral text-neutral-content font-black tracking-wide shadow-md px-3 py-1 text-xs">
              {age || "—"} YRS
            </span>
          </div>

          {/* Swiping Status Stamps */}
          {cardState === "swipe-left" && (
            <div className="absolute inset-0 bg-error/20 flex items-center justify-center backdrop-blur-xs z-20 transition-all duration-200 animate-pulse">
              <span className="border-4 border-error text-error font-black tracking-widest uppercase text-3xl px-6 py-2 rounded-xl rotate-[-12deg]">
                Pass
              </span>
            </div>
          )}
          {cardState === "swipe-right" && (
            <div className="absolute inset-0 bg-success/20 flex items-center justify-center backdrop-blur-xs z-20 transition-all duration-200 animate-pulse">
              <span className="border-4 border-success text-success font-black tracking-widest uppercase text-3xl px-6 py-2 rounded-xl rotate-[12deg]">
                Connect
              </span>
            </div>
          )}
        </div>

        {/* Profile Details Section */}
        <div className="card-body p-5 flex flex-col justify-between h-1/2 bg-base-200">
          <div>
            {/* Identity Title Heading */}
            <h3 className="text-xl font-bold tracking-tight text-base-content flex items-baseline gap-1.5 truncate">
              <span>{firstName}</span>
              {lastName && (
                <span className="font-serif italic font-normal text-base-content/60 text-lg">
                  {lastName}
                </span>
              )}
            </h3>

            {/* Profile Bio Description */}
            <p className="text-sm text-base-content/70 mt-2 line-clamp-3 leading-relaxed font-medium min-h-[4.25rem]">
              {about || "No biography provided yet."}
            </p>
          </div>

          {/* Technical Skills Array */}
          <div className="mt-2">
            <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-[2rem]">
              {skills && skills.length > 0 ? (
                skills.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-sm bg-base-300 text-base-content/80 border-base-300 font-bold uppercase tracking-wider text-[10px]"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs italic text-base-content/40 font-medium">
                  No skills cataloged
                </span>
              )}
            </div>
          </div>

          {/* Direct Interactive Control Actions Layout */}
          <div className="flex items-center gap-3 mt-4 pt-2 border-t border-base-300/40">
            {/* Skip Option button */}
            <button
              onClick={() => handleAction("ignored")}
              disabled={!!loadingAction}
              className="btn btn-outline btn-error flex-1 h-12 rounded-xl font-bold tracking-wide transition-all group hover:bg-error hover:text-error-content active:scale-98"
              aria-label="Pass on profile"
            >
              {loadingAction === "ignored" ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <span className="flex items-center gap-1">
                  <span className="text-lg transition-transform group-hover:scale-110">
                    ✕
                  </span>{" "}
                  Pass
                </span>
              )}
            </button>

            {/* Connect Option button */}
            <button
              onClick={() => handleAction("interested")}
              disabled={!!loadingAction}
              className="btn btn-primary flex-1 h-12 rounded-xl font-bold tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group active:scale-98"
              aria-label="Connect with developer"
            >
              {loadingAction === "interested" ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <span className="flex items-center gap-1 text-primary-content">
                  Connect{" "}
                  <span className="text-base transition-transform group-hover:translate-x-0.5">
                    ✦
                  </span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
