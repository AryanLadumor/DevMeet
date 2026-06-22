import React, { useState } from "react";
import apiCall from "../../utils/axiosInstance";

const RequestsCard = ({ user, reqId, onReply }) => {
  const { firstName, lastName, age, gender, about, photoURL } = user;
  const [isProcessing, setIsProcessing] = useState(false);

  const reqReply = async (stat, _id) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await apiCall.post(`/request/review/${stat}/${_id}`);
      onReply(reqId);
    } catch (error) {
      console.error("Error updating request status:", error);
      onReply(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Modern gender icon tag pairing selector
  const getGenderIcon = (g) => {
    switch (g?.toLowerCase()) {
      case "male": return "♂";
      case "female": return "♀";
      default: return "⚧";
    }
  };

  return (
    <div className="card bg-base-200 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between p-5 group hover:border-secondary/20">

      {/* Profile Info Header Content layout mapping */}
      <div className="flex gap-4 items-start min-w-0">
        {/* Aspect-stabilized Avatar Container frame wrapper */}
        <div className="avatar shrink-0">
          <div className="w-16 h-16 rounded-full ring-2 ring-base-300 group-hover:ring-secondary/40 transition-[ring-color] duration-200 overflow-hidden bg-base-300">
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

      {/* User About Summary Block Description */}
      <div className="mt-4 flex-1 min-w-0">
        <p className="text-sm text-base-content/70 font-medium line-clamp-2 leading-relaxed min-h-[2.5rem] break-words">
          {about || "Hey there! Let's collaborate and check out our matching tech stack fields."}
        </p>
      </div>

      {/* Action Decision Control Buttons Layout Wrapper Panel */}
      <div className="flex items-center gap-3 mt-5 pt-3 border-t border-base-300/40 w-full">
        {/* Reject Interaction Trigger Option Button */}
        <button
          className="btn btn-outline btn-error btn-sm flex-1 h-10 rounded-xl font-bold tracking-wide transition-[background-color,color,border-color,transform,box-shadow] duration-200 active:scale-98 focus-visible:ring-2 focus-visible:ring-error/50"
          onClick={() => reqReply("rejected", reqId)}
          disabled={isProcessing}
          aria-label={`Reject request from ${firstName}`}
        >
          {isProcessing ? <span className="loading loading-spinner loading-xs" aria-hidden="true"></span> : "Reject"}
        </button>

        {/* Accept Interaction Trigger Option Button */}
        <button
          className="btn btn-secondary btn-sm flex-1 h-10 rounded-xl font-bold tracking-wide shadow-md shadow-secondary/10 hover:shadow-secondary/20 text-secondary-content transition-[background-color,color,border-color,transform,box-shadow] duration-200 active:scale-98 focus-visible:ring-2 focus-visible:ring-secondary/50"
          onClick={() => reqReply("accepted", reqId)}
          disabled={isProcessing}
          aria-label={`Accept request from ${firstName}`}
        >
          {isProcessing ? <span className="loading loading-spinner loading-xs" aria-hidden="true"></span> : "Accept"}
        </button>
      </div>

    </div>
  );
};

export default RequestsCard;