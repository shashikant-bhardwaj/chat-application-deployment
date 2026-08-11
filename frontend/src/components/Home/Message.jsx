import React from "react";
import { useSelector } from "react-redux";

function Message({ message, onMessageClick, onMessageLongPress }) {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const { userMessages } = useSelector((store) => store.message);

  const isSender = message?.senderId?.toString() === authUser?._id?.toString();
  const isReceiver = message.receiverId === selectedUser._id;

  let timer;

  const handleTouchStart = () => {
    timer = setTimeout(() => {
      onMessageLongPress(message);
    }, 500);
  };
  const handleTouchEnd = () => {
    clearTimeout(timer);
  };

  // WhatsApp style double tick icon
  const DoubleTick = ({ seen }) => (
    <svg
      viewBox="0 0 16 15"
      width="16"
      height="15"
      className={`inline-block ml-1 ${seen ? "text-green-400" : "text-gray-300"}`}
      fill="currentColor"
    >
      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.144.145.373.128.5-.036l6.272-8.048a.366.366 0 0 0-.064-.51z" />
      <path d="M11.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.666 9.879a.32.32 0 0 1-.484.033L2.678 8.42a.365.365 0 0 0-.51.063l-.375.483a.365.365 0 0 0 .063.51l2.803 2.163c.144.115.353.1.48-.036l6.272-8.048a.365.365 0 0 0-.063-.51z" />
    </svg>
  );

  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          onMessageClick(message);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`rounded-xl p-3 w-fit flex items-end gap-1 ${
          isSender ? "bg-blue-600 text-white ml-auto" : "bg-gray-700 text-white"
        } ${message.deletedForEveryone ? "bg-gray-800" : ""}`}
      >
        {message.deletedForEveryone ? (
          <span className="italic text-sm text-gray-300">
            This message was deleted
          </span>
        ) : (
          <span>{message.message}</span>
        )}
        {
          <span className="text-xs opacity-70 ml-1">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        }

        {/* Sirf apne bheje hue messages pe tick dikhana hai */}
        {isSender && !message.deletedForEveryone && (
          <DoubleTick seen={message.isSeen} />
        )}
      </div>
    </div>
  );
}

export default Message;
