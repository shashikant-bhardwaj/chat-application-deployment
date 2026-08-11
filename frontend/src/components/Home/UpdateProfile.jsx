import React, { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

import UseUploadProfile from "../../hooks/uploadProfile/useUploadProfile.js";

function updateProfile({ setSelectedProfilePage }) {
  const { uploadProfile } = UseUploadProfile();
  const { authUser } = useSelector((store) => store.user);
  const fileRef = useRef(null);

  const [preview, setPreview] = useState(authUser?.profilePhoto);
  const [file, setFile] = useState(null);

  // if (!open) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl bg-gray-900 p-5 md:p-7 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            setSelectedProfilePage(false);
          }}
          className="absolute right-4 top-4 text-xl text-white hover:text-red-500"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="mb-6 text-center text-xl font-bold text-white md:text-2xl">
          My Profile
        </h2>

        {/* Profile Photo */}
        <div className="relative mx-auto w-fit">
          <img
            src={authUser?.profilePhoto}
            alt="Profile"
            className="h-28 w-28 rounded-full border-4 border-gray-700 object-cover md:h-36 md:w-36 lg:h-40 lg:w-40"
          />

          <button
            onClick={() => fileRef.current.click()}
            className="absolute bottom-2 right-1 rounded-full bg-blue-600 p-2 hover:bg-blue-700"
          >
            <FaEdit className="text-sm text-white md:text-base" />
          </button>

          <input
            ref={fileRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-3 rounded-lg bg-gray-800 p-4 text-white">
          <div>
            <p className="text-xs text-gray-400">Full Name</p>
            <p className="text-sm md:text-base">{authUser?.fullName}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Username</p>
            <p className="text-sm md:text-base">{authUser?.username}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="break-all text-sm md:text-base">{authUser?.email}</p>
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => {
            console.log("clicked");
            uploadProfile(file);
            setSelectedProfilePage(false);
          }}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 md:text-base"
        >
          Upload Photo
        </button>
      </div>
    </div>
  );
}

export default updateProfile;
