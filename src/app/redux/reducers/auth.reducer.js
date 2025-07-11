import { createSlice } from "@reduxjs/toolkit";
import {
  userForgotPassword,
  userLoad,
  userLogin,
  userLogout,
  userRegister,
  userResetPassword,
  userUpdateProfile,
  userVerify,
} from "../thunk/auth.thunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  message: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to register.";
      })

      // Verify
      .addCase(userVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(userVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to verify user.";
      })

      // Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.message = action.payload.message;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to login.";
      })

      // Load user
      .addCase(userLoad.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userLoad.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(userLoad.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Logout
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to logout.";
      })

      // Forgot password
      .addCase(userForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Internal server error.";
      })

      // Reset password
      .addCase(userResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(userResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Internal server error.";
      })

      // Update profile
      .addCase(userUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.message = action.payload.message;
      })
      .addCase(userUpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Internal server error.";
      });
  },
});

export default authSlice;
export const { clearMessage, clearError } = authSlice.actions;
