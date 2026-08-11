import React, { useState } from "react";
import useSendMessage from "../../hooks/sendMessage/useSendMessage.js";
import EmojiPicker from "emoji-picker-react";

function SendInput() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { send, loading } = useSendMessage();

  const handleSend = () => {
    if (!message?.trim()) return;
    send(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };
  return (
    <div className="relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme="dark"
            width={320}
            height={400}
          />
        </div>
      )}

      <div className="flex gap-2 items-center">
        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-2xl hover:scale-110 transition-transform"
        >
          😊
        </button>

        {/* Message Input */}
        <input
          onKeyDown={handleKeyDown}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-full px-4 py-3 bg-white/10 border border-gray-600 text-white outline-none"
          placeholder="Type a message..."
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-full text-white transition disabled:opacity-50"
        >
          {loading ? "...sending" : "Send"}
        </button>
      </div>
    </div>
  );
}

export default SendInput;
