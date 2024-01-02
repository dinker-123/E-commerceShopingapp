import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebaseInit";

const INITIAL_STATE = {
  user: null,
  isSigningIn: false,
  signInSuccess: false,
  isSigningUp: false,
  signUpSuccess: false,
  signOutSuccess: false,
};

export const signInThunk = createAsyncThunk(
  "user/signin",
  async (arg, thunkAPI) => {
    const { email, pass } = arg;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      return userCredential.user.uid;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const signUpThunk = createAsyncThunk(
  "user/signup",
  async (arg, thunkAPI) => {
    const { email, pass } = arg;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      return userCredential.user.uid;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const signOutThunk = createAsyncThunk(
  "user/signout",
  (arg, thunkAPI) => {
    return signOut(auth);
  }
);

const userSlice = createSlice({
  name: "userslice",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSignInSuccess: (state, action) => {
      state.signInSuccess = action.payload;
    },
    setSignUpSuccess: (state, action) => {
      state.signUpSuccess = action.payload;
    },
    setSignOutSuccess: (state, action) => {
      state.signOutSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state, action) => {
        state.isSigningIn = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isSigningIn = false;
        state.signInSuccess = true;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isSigningIn = false;
      })
      .addCase(signUpThunk.pending, (state, action) => {
        state.isSigningUp = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.signUpSuccess = true;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isSigningUp = false;
      })
      .addCase(signOutThunk.fulfilled, (state, action) => {
        state.signOutSuccess = true;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state) => state.userReducer;
