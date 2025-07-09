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
  loading: false,
  message: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loading = false;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to Register";
      });

    builder
      .addCase(userVerify.pending, (state) => {
        state.loading = true;
      })
      .addCase(userVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(userVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to fetch USer";
      });

    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.message = action.payload.message;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "unable to login";
      });

    builder
      .addCase(userLoad.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoad.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(userLoad.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to Logout";
      });

    builder
      .addCase(userForgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(userForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Internal Server Error";
      });

    builder
      .addCase(userResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(userResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(userResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Internal Server Error";
      });

    builder
      .addCase(userUpdateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.message = action.payload.message;
      })
      .addCase(userUpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Internal Server Error";
      });
  },
});

export default authSlice;
export const { userExists, userNotExists, clearMessage, clearError } =
  authSlice.actions;
