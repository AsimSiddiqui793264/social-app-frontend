import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../services/authApi";

const savedUser = localStorage.getItem("socialAppUser");

const initialState = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: Boolean(savedUser),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginUser(credentials);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed"
      );
    }
  }
);

const getUserFromResponse = (payload) => {
  const possibleUsers = [
    payload?.data?.user,
    payload?.data?.loggedInUser,
    payload?.data?.userData,
    payload?.user,
    payload?.loggedInUser,
    payload?.userData,
    payload?.data,
  ];

  return (
    possibleUsers.find(
      (user) =>
        user &&
        typeof user === "object" &&
        (user._id || user.id)
    ) || null
  );
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("socialAppUser");
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = Boolean(action.payload);

      if (action.payload) {
        localStorage.setItem(
          "socialAppUser",
          JSON.stringify(action.payload)
        );
      } else {
        localStorage.removeItem("socialAppUser");
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const user = getUserFromResponse(action.payload);

        if (user) {
          state.currentUser = user;
          state.isAuthenticated = true;

          localStorage.setItem(
            "socialAppUser",
            JSON.stringify(user)
          );
        } else {
          // Login cookie is still created by the backend.
          // User data could not be found in the login response.
          state.isAuthenticated = true;
        }
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
