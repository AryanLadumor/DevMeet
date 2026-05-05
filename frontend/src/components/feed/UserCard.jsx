import React, { useState, useRef } from "react";
import apiCall from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../store/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoURL, about, skills } = user;
  const dispatch = useDispatch();

  const [leaving, setLeaving] = useState(false);
  const [action, setAction] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [entered, setEntered] = useState(false);

  const dragStartX = useRef(null);
  const cardRef = useRef(null);

  // Entry animation on mount
  React.useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
  }, []);

  const handleSendRequest = async (status, userId) => {
    if (leaving) return;
    setAction(status);
    setLeaving(true);
    try {
      await apiCall.post(`/request/send/${status}/${userId}`);
      setTimeout(() => dispatch(removeUserFromFeed(userId)), 450);
    } catch (error) {
      console.log(error);
      console.dir(error);
      setLeaving(false);
      setAction(null);
    }
  };

  // --- Drag handlers ---
  const onDragStart = (clientX) => {
    dragStartX.current = clientX;
    setIsDragging(true);
  };

  const onDragMove = (clientX) => {
    if (!isDragging || dragStartX.current === null) return;
    setDragX(clientX - dragStartX.current);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX < -80) {
      handleSendRequest("ignored", _id);
    } else if (dragX > 80) {
      handleSendRequest("interested", _id);
    } else {
      setDragX(0); // snap back
    }
    dragStartX.current = null;
  };

  // Mouse events
  const onMouseDown = (e) => onDragStart(e.clientX);
  const onMouseMove = (e) => onDragMove(e.clientX);
  const onMouseUp = () => onDragEnd();

  // Touch events
  const onTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const onTouchMove = (e) => onDragMove(e.touches[0].clientX);
  const onTouchEnd = () => onDragEnd();

  // Derived visual values
  const swipeProgress = Math.min(Math.abs(dragX) / 100, 1); // 0 → 1
  const isSwipingLeft = dragX < -20;
  const isSwipingRight = dragX > 20;

  const cardTransform = (() => {
    if (leaving) {
      return action === "ignored"
        ? "translateX(-120%) rotate(-20deg)"
        : "translateX(120%) rotate(20deg)";
    }
    if (!entered) return "translateY(60px) scale(0.92)";
    if (isDragging || dragX !== 0) {
      return `translateX(${dragX}px) rotate(${dragX * 0.06}deg)`;
    }
    return "translateY(0) scale(1)";
  })();

  const cardOpacity = leaving ? 0 : !entered ? 0 : 1;

  const genderIcon =
    gender?.toLowerCase() === "female" ? "♀" :
    gender?.toLowerCase() === "male" ? "♂" : "⚧";

  return (
    <div
      ref={cardRef}
      className="relative select-none"
      style={{
        width: "320px",
        height: "480px",
        borderRadius: "24px",
        overflow: "hidden",
        flexShrink: 0,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
        transform: cardTransform,
        opacity: cardOpacity,
        boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
        userSelect: "none",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background photo */}
      <img
        src={photoURL}
        alt={firstName}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Base gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.82) 72%, rgba(0,0,0,0.97) 100%)",
      }} />

      {/* LEFT swipe overlay — red */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-100" style={{
        background: "linear-gradient(135deg, rgba(239,68,68,0.7), rgba(185,28,28,0.4))",
        opacity: isSwipingLeft ? swipeProgress * 0.85 : 0,
      }} />

      {/* RIGHT swipe overlay — green */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-100" style={{
        background: "linear-gradient(225deg, rgba(34,197,94,0.7), rgba(21,128,61,0.4))",
        opacity: isSwipingRight ? swipeProgress * 0.85 : 0,
      }} />

      {/* IGNORE stamp */}
      <div className="absolute top-10 left-5 pointer-events-none transition-opacity duration-100 z-10" style={{
        opacity: isSwipingLeft ? swipeProgress : 0,
        transform: "rotate(-20deg)",
      }}>
        <span className="border-4 border-red-500 text-red-400 font-black text-2xl px-3 py-1 rounded-lg tracking-widest uppercase">
          Nope
        </span>
      </div>

      {/* INTERESTED stamp */}
      <div className="absolute top-10 right-5 pointer-events-none transition-opacity duration-100 z-10" style={{
        opacity: isSwipingRight ? swipeProgress : 0,
        transform: "rotate(20deg)",
      }}>
        <span className="border-4 border-green-500 text-green-400 font-black text-2xl px-3 py-1 rounded-lg tracking-widest uppercase">
          Like!
        </span>
      </div>

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <span className="badge badge-ghost backdrop-blur-md text-white border border-white/20 text-xs font-semibold">
          {genderIcon} {gender || "—"}
        </span>
        <span className="badge text-white font-bold text-xs px-3" style={{
          background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
          boxShadow: "0 4px 12px rgba(124,58,237,0.5)",
        }}>
          {age} yrs
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h2 style={{
          margin: "0 0 6px",
          color: "#fff",
          fontSize: "26px",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          lineHeight: 1.1,
          fontFamily: "'Georgia', serif",
        }}>
          {firstName} <span style={{ fontStyle: "italic", fontWeight: 400 }}>{lastName}</span>
        </h2>

        {about && (
          <p className="text-white/60 text-sm mb-3 line-clamp-2 leading-relaxed">
            {about}
          </p>
        )}

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.slice(0, 4).map((skill, i) => (
              <span key={i} className="badge badge-sm border text-xs font-semibold uppercase tracking-wider" style={{
                background: "rgba(167,139,250,0.18)",
                borderColor: "rgba(167,139,250,0.35)",
                color: "#c4b5fd",
              }}>
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2.5">
          <button
            className="btn flex-1 border border-white/20 text-white/75 text-xl font-bold hover:bg-red-500/25 hover:border-red-400/50 hover:text-red-300 transition-all"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", borderRadius: "14px" }}
            onClick={(e) => { e.stopPropagation(); handleSendRequest("ignored", _id); }}
          >
            ✕
          </button>
          <button
            className="btn  text-white font-bold tracking-wider hover:-translate-y-0.5 transition-all"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              borderRadius: "14px",
              border: "none",
              boxShadow: "0 8px 24px rgba(124,58,237,0.45)",
            }}
            onClick={(e) => { e.stopPropagation(); handleSendRequest("interested", _id); }}
          >
            Interested ✦
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;