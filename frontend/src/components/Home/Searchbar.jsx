import React, { useState } from "react";
import { useSelector } from "react-redux";

function Searchbar({ setSearchedUser }) {
  const [user, setUser] = useState("");

  const { otherUsers } = useSelector((store) => store.user);

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const result = otherUsers.find((item) =>
        item.fullName.trim().toLowerCase().includes(user.trim().toLowerCase()),
      );
      console.log(result);
      setSearchedUser(result);
    }
  };

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold text-white">Chats</h1>

      <input
        type="text"
        value={user}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="relative mt-4 w-full rounded-lg bg-white/10 border border-gray-600 px-4 py-2 text-white outline-none"
      />
    </div>
  );
}

export default Searchbar;
