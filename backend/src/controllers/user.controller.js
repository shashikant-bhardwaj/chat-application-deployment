import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getIO, getSocketId } from "../socket/socket.js";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(
      "something went wrong while  generating access and refresh token",
    );
    throw error;
  }
};

// register user

const userRegister = asyncHandler(async (req, res) => {
  //get details from frontend
  //validation
  //find if user already exist
  // create user and entry in db
  //check user
  // send res

  const { fullName, username, email, password, gender } = req.body;

  if (
    [fullName, username, email, password, gender].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "user already exist with this username");
  }

  const boyProfile = `https://avatarapi.runflare.run/public/boy?usearname=${username}`;
  const girlProfile = `https://avatarapi.runflare.run/public?usearname=${username}`;

  const user = await User.create({
    fullName,
    email,
    username,
    password,
    profilePhoto: gender === "male" ? boyProfile : girlProfile,
    gender,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "someting went wrong while registering user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user is registered successfully"));
});

//login controller

const login = asyncHandler(async (req, res) => {
  //get details from user to login
  //how you want user to login
  //validation
  //check user exist or not
  //check password correct
  //generate access and refresh token and send it to user in cookies
  //send res

  const { identifier, password } = req.body;

  if (!identifier) {
    throw new ApiError(400, "username or email is required");
  }

  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const existedUser = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
  if (!existedUser) {
    throw new ApiError(400, "you are not registered yet");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existedUser._id,
  );
  const user = await User.findById(existedUser._id).select(
    "-password -refreshToken",
  );
  if (!user) {
    throw new ApiError(200, "something went wrong please try again");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: user,
          accessToken,
          refreshToken,
        },
        "Logged in successfully",
      ),
    );
});

//logout controller

const logout = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );
  await user.save({ validateBeforeSave: true });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "logged out successfully"));
});

//getAllOtherUsers controller
const getOtherUsers = asyncHandler(async (req, res) => {
  const allOtherLoggedInUser = await User.find({
    _id: { $ne: req.user?._id },
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allOtherLoggedInUser,
        allOtherLoggedInUser.length
          ? "users fetched successfully"
          : "no other user exist",
      ),
    );
});

//get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, user, "got current user successfully"));
});

// upload profile  photo
const uploadProfilePhoto = asyncHandler(async (req, res) => {
  const profileLocalFilePath = req.file?.path;

  if (!profileLocalFilePath) {
    throw new ApiError(400, "Profile photo is required");
  }

  // Upload image to Cloudinary
  const profilePhoto = await uploadOnCloudinary(profileLocalFilePath);

  if (!profilePhoto?.url) {
    throw new ApiError(500, "Failed to upload profile photo");
  }

  // Save Cloudinary URL in database
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        profilePhoto: profilePhoto.url,
      },
    },
    {
      new: true,
    },
  ).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  // socket.io
  getIO().emit("updatedUserPhoto", {userId: updatedUser?._id, 
                                    profilePhoto: updatedUser?.profilePhoto})

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "Profile photo uploaded successfully"),
    );
});

export {
  userRegister,
  login,
  logout,
  getOtherUsers,
  getCurrentUser,
  uploadProfilePhoto,
};
