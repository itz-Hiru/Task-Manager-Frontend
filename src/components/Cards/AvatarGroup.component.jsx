import React from "react";
import CharAvatar from "./CharAvatar.component";

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <div
          key={index}
          className="w-9 h-9 -ml-5 first:ml-0 border-2 border-white rounded-full overflow-hidden bg-slate-200 flex items-center justify-center"
        >
          {avatar ? (
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
          ) : (
            <CharAvatar
              fullName={`User ${index + 1}`}
              width="w-9"
              height="h-9"
              style="text-sm"
            />
          )}
        </div>
      ))}

      {avatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
