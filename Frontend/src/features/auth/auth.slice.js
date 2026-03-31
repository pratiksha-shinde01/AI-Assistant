import { createSlice } from "@reduxjs/toolkit";

// ✅ SAFE PARSE
let savedUser = null;

try {
  const raw = localStorage.getItem("user");
  savedUser = raw ? JSON.parse(raw) : null;
} catch (err) {
  localStorage.removeItem("user"); // cleanup bad data
  savedUser = null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    loading: false,
    error: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

      // ✅ ALWAYS stringify
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logoutUser: (state) => {
      state.user = null;
      state.error = null;

      localStorage.removeItem("user");
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, logoutUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;