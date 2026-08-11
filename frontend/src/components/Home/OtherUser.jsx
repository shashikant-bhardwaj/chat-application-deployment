import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../features/user/userSlice.js";
import { useSelector } from "react-redux";

function OtherUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      // key={user.id}
      onClick={() => dispatch(setSelectedUser(user))}
      className={`
  flex items-center gap-3 p-4 cursor-pointer rounded-lg
  transition-all duration-10
  ${
    selectedUser?._id === user._id
      ? "bg-blue-500/20 shadow-lg shadow-blue-500/40 border border-blue-400"
      : "hover:bg-white/10"
  }
`}
    >
      <img src={user.profilePhoto} alt="" className="w-12 h-12 rounded-full" />

      <div>
        <h2 className="text-white font-semibold">{user.fullName}</h2>

        <p
          className={`text-sm ${isOnline ? "text-green-400" : "text-gray-600"}`}
        >
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
}

export default OtherUser;
