import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import UseMessageMarkAsSeen from "../../hooks/markMessageAsSeen/useMessageMarkAsSeen";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
function MessageContainer({ selectedUser }) {
  const dispatch = useDispatch();
  const { MarkAsSeen } = UseMessageMarkAsSeen();
  const { onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers.includes(selectedUser?._id);
  console.log(isOnline);

  useEffect(() => {
    if (!selectedUser?._id) return;

    MarkAsSeen(selectedUser?._id);
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center text-white">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}

      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
        {/* Back Button */}

        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="md:hidden text-white text-2xl"
        >
          ←
        </button>

        <img
          src={selectedUser?.profilePhoto}
          alt=""
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h2 className="text-white font-semibold">{selectedUser?.fullName}</h2>

          <p className="text-green-400 text-sm">
            {isOnline ? "Online" : "Ofline"}
          </p>
        </div>
      </div>

      {/* Messages */}

      <Messages />

      {/* Input */}

      <SendInput />
    </div>
  );
}

export default MessageContainer;
