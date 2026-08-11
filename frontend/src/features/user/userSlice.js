import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUser: null,
    otherUsers: null,
    onlineUsers: [],
    selectedUser: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload

        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        setUpdateProfilePhoto: (state, action) => {
            const {userid, profilePhoto} = action.payload;
            if(state.otherUsers){
            state.onlineUsers = state.otherUsers.map( (user) => 
                user?._id === userId ? { ...user, profilePhoto } : u
            );
            }
            if(state.selectedUser?._id === userId){
                state.selectedUser = { ...state.selectedUser, profilePhoto}
            };
         
        }
    }
})

export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers, setUpdateProfilePhoto} = userSlice.actions
export default userSlice.reducer