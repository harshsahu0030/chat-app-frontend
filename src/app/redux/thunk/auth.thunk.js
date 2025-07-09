import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../../constant/config";

const config = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (registerForm) => {
    try {
      const { data } = await axios.post(
        `${server}/api/v1/auth/register`,
        registerForm,
        config
      );

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const userVerify = createAsyncThunk("user/verify", async (token) => {
  try {
    const { data } = await axios.get(
      `${server}/api/v1/auth/verify/${token}`,
      config
    );
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const userLogin = createAsyncThunk("user/login", async (loginForm) => {
  try {
    const { data } = await axios.post(
      `${server}/api/v1/auth/login`,
      loginForm,
      config
    );

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const userLoad = createAsyncThunk("user/me", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/auth/me`, config);
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const userLogout = createAsyncThunk("user/logout", async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/auth/logout`, config);
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const userForgotPassword = createAsyncThunk(
  "user/forgot/password",
  async (forgotForm) => {
    try {
      const { data } = await axios.post(
        `${server}/api/v1/auth/password/forgot`,
        forgotForm,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
export const userResetPassword = createAsyncThunk(
  "user/reset/password",
  async ({ token, resetForm }) => {
    try {
      const { data } = await axios.put(
        `${server}/api/v1/auth/password/reset/${token}`,
        resetForm,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
export const userUpdateProfile = createAsyncThunk(
  "user/profile/update",
  async (updateForm) => {
    try {
      const { data } = await axios.put(
        `${server}/api/v1/auth/profile/update`,
        updateForm,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
