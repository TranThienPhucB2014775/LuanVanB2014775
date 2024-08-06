import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const adminLogin = createAsyncThunk(
  "auth/admin-login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log("1");
    try {
      const { data } = await api.post("identity/auth/token/admin", info, {
        // withCredentials: true,
      });
      console.log(data);
      if (data?.code === 0) {
        localStorage.setItem("accessToken", data.result.token);
      }

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminLogout = createAsyncThunk(
  "auth/admin-logout",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("identity/auth/token/admin", info, {
        // withCredentials: true,
      });
      console.log(data);
      if (data?.code === 0) {
        localStorage.setItem("accessToken", data.result.token);
      }

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const returnUserId = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);

    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return;
    } else {
      return decodeToken.scope;
    }
  } else {
    return;
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    role: "",
    token: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loader = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loader = false;
        // state.successMessage = action.payload.msg;
        state.token = action.payload.result.token;
        state.role = returnUserId(action.payload.result.token);
        // console.log(action.payload.result.token);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loader = false;
        console.log(action);
        state.errorMessage = action.payload.result;
      });
  },
});

export default authReducer.reducer;
export const { clearMessage } = authReducer.actions;
