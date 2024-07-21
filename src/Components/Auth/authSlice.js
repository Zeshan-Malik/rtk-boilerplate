import { createSlice, rejectWithValue } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Config/APIConfigs";
import headers from "../../Config/ApiConfig/Headers";
import axios from "axios";
import { sha256 } from "js-sha256";

const initialAuthState = {
  me: {},
  tokens: {},
  isAuthenticated: false,
  error: "",
  countryList: [],
};

export const login = createAsyncThunk(
  "auth/login",
  (creds, { rejectWithValue }) => {
    creds.password = sha256(creds.password);
    return axios
      .post(API.Auth.Login, creds, headers)
      .then((response) => {
        if (response.data.success) {
          setSession(response.data);
        }
        return response.data;
      })
      .catch((err) => {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err);
      });
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  (creds, { rejectWithValue }) => {
    let payload = JSON.parse(JSON.stringify(creds));
    payload.password = sha256(payload.password);
    return axios
      .post(API.Auth.Signup, payload, headers)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err);
      });
  }
);

export const ResetPassword = createAsyncThunk(
  "auth/resetpassword",
  (creds, { rejectWithValue }) => {
    return axios
      .post(API.Auth.ResetPass, creds, headers)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err);
      });
  }
);

const APIHeaders = {
  authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWMzNDAwZTAxZDAzN2U1MzcxOTZlYSIsImlhdCI6MTcyMTUyMTQyNSwiZXhwIjoxNzIxNTI1MDI1fQ.lRY4kHkCVmap_Vl4V17pUUVXfCt97SKpPtaMmjyOjhs",

};
export const logoutUser = createAsyncThunk(
  "auth/resetpassword",
  (creds, { rejectWithValue }) => {
    return axios
      .post(API.Auth.LogOut,APIHeaders, Headers)
      .then((response) => {
        return response
      })
      .catch((err) => {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err);
      });
  }
);

export const GetCountries = createAsyncThunk("auth/GetCountries", () => {
  return axios
    .get(API.Auth.CountriesList, {
      Accept: "application/json, text/plain, /",
      "Content-Type": "multipart/form-data",
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("error****", err);
    });
});

export const GetLogo = createAsyncThunk("auth/GetLogo", () => {
  return axios
    .get(API.Auth.ProfileLogo, {
      Accept: "application/json, text/plain, /",
      "Content-Type": "multipart/form-data",
      responseType: "blob",
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("error****", err);
    });
});

const setSession = (tokens) => {
  // window.localStorage.setItem("DSA_access_token", tokens.access);
  // window.localStorage.setItem("DSA_refresh_token", tokens.refresh);
  window.localStorage.setItem("DSA_isAuthenticated", true);
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.tokens = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false;
      if (action?.payload?.response?.data?.detail) {
        state.error = action?.payload?.response?.data?.detail;
      } else {
        state.error = action.payload.response.data;
      }
    });
    builder.addCase(GetCountries.fulfilled, (state, action) => {
      state.countryList = action.payload;
    });
  },
});

export default authSlice.reducer;
