import React from "react";
import CharAvatar from "./CharAvatar.component";
import StatCard from "./StatCard.component";

const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {userInfo?.profileImageUrl ? (
            <img
              src={userInfo?.profileImageUrl}
              alt={userInfo?.name}
              className="w-10 h-10 bg-slate-400 rounded-full"
            />
          ) : (
            <CharAvatar
              fullName={userInfo?.name}
              width="w-10"
              height="h-10"
              style="text-xl"
            />
          )}
          <div>
            <p className="text-sm font-medium">{userInfo?.name}</p>
            <p className="text-xs text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.isProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;
