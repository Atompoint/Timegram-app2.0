import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
// import { signOut } from "@fb/user";

const initialState = {
  loading: true,
  auth: null,
  firestore: null,
  uploading: false,
  uploadTime: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUserFirestore: (state, action) => {
      state.firestore = action.payload;
    },
    updateTime: (state) => {
      const timeNow = moment(new Date()).format(
        "dddd,  MMM DD gggg hh:mm:ss A"
      );
      state.uploadTime = timeNow;
    },
    startUploading: (state) => {
      state.uploading = true;
    },
    stopUploading: (state) => {
      state.uploading = false;
    },
    startUserLoading: (state) => {
      state.loading = true;
    },
    stopUserLoading: (state) => {
      state.loading = false;
    },
    clearUser: (state) => {
      state.uploading = false;
      state.uploadTime= null;
      state.loading = false;
      state.auth = null;
      state.firestore = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserAuth,
  setUserFirestore,
  clearUser,
  startUserLoading,
  stopUserLoading,
  updateTime,
  startUploading,
  stopUploading,
} = userSlice.actions;
export default userSlice.reducer;
