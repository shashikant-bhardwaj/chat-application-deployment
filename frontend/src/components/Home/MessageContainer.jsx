import React, { useEffect } from "react";
import SendInput from "./SendInput.jsx";
import Messages from "./Messages.jsx";
import UseMessageMarkAsSeen from "../../hooks/markMessageAsSeen/useMessageMarkAsSeen.js";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../features/user/userSlice.js";

function MessageContainer({ selectedUser }) {
  const dispatch = useDispatch();

  const { MarkAsSeen } = UseMessageMarkAsSeen();
  const { onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  useEffect(() => {
    if (!selectedUser?._id) return;

    MarkAsSeen(selectedUser._id);
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <div className="hidden md:flex h-full min-h-0 flex-1 items-center justify-center text-white">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">

      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 p-3 sm:p-4 border-b border-gray-700">

        {/* Back Button */}
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="md:hidden text-white text-2xl"
        >
          ←
        </button>

        <img
          src={selectedUser?.profilePhoto}
          alt={selectedUser?.fullName}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
        />

        <div className="min-w-0">
          <h2 className="text-white font-semibold truncate">
            {selectedUser?.fullName}
          </h2>

          <p className="text-green-400 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar">
        <Messages />
      </div>

      {/* Input */}
      <div className="shrink-0">
        <SendInput />
      </div>

    </div>
  );
}

export default MessageContainer;