import React, { useEffect, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/getMessages/useGetMessages";
import { useSelector } from "react-redux";
import SendInput from "./SendInput";
import { useDispatch } from "react-redux";
import { setSelectedMessage } from "../../features/message/messageSlice";
import UseDeleteForMe from "../../hooks/deleteForMe/useDeleteForMe";
import useDeleteForEveryone from "../../hooks/deleteForEveryone/useDeleteForEveryone";

function Messages() {
  useGetMessages();
  const dispatch = useDispatch();
  const { deleteForEveryone } = useDeleteForEveryone();
  const { selectedUser } = useSelector((store) => store.user);
  const { selectedMessage } = useSelector((store) => store.message);
  const { authUser } = useSelector((store) => store.user);
  const { deleteForMe } = UseDeleteForMe();
  const [showMenu, setShowMenu] = useState(false);
  const handleMessageClick = (message) => {
    dispatch(setSelectedMessage(message));
    setShowMenu(true);
  };
  const handleMessageLongPress = (message) => {
    dispatch(setSelectedMessage(message));
    setShowMenu(true);
  };
  const { userMessages } = useSelector((store) => store.message);
  return (
    <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
      {userMessages.length > 0 ? (
        userMessages.map((message) => {
          return (
            <Message
              key={message?._id}
              message={message}
              onMessageClick={handleMessageClick}
              onMessageLongPress={handleMessageLongPress}
            />
          );
        })
      ) : (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-10 shadow-xl max-w-md">
            <div className="text-5xl mb-4">💬</div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Let's Start a Conversation
            </h2>

            <p className="text-gray-950 text-sm leading-relaxed">
              No messages here yet. Say hello and start a new conversation with{" "}
              <span className="text-blue-700 font-medium">
                {selectedUser.fullName}
              </span>
              .
            </p>

            <div className="mt-5 text-sm text-gray-950">
              Send your first message 👋
            </div>
          </div>
        </div>
      )}

      {showMenu && (
        <div
          className="
    fixed
    bottom-6
    left-1/2
    -translate-x-1/2
    w-64
    overflow-hidden
    rounded-2xl
    border border-white/10
    bg-gray-900/95
    backdrop-blur-xl
    shadow-2xl
    z-50
    animate-in
    fade-in
    duration-150
  "
        >
          <button
            onClick={() => {
              deleteForMe();
              setShowMenu(false);
            }}
            className="w-full px-5 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200"
          >
            Delete for me
          </button>
          {/* {setShowMenu(false)} */}

          {selectedMessage?.senderId === authUser._id && (
            <button
              onClick={() => {
                deleteForEveryone();
                setShowMenu(false);
              }}
              className="w-full px-5 py-3 text-left text-red-400 hover:bg-red-500/10 transition-colors duration-200"
            >
              Delete for everyone
            </button>
          )}

          <div className="h-px bg-white/10 mx-3" />

          <button
            onClick={() => setShowMenu(false)}
            className="w-full px-5 py-3 text-left text-gray-300 hover:bg-white/10 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Messages;
