import { emitMessage } from "@/app/(components)/NotificationToaster";
import {
    makeClientAuthStatusCheckRequest,
    makeClientLogInRequest,
    makeClientSignUpRequest,
} from "@/app/utils/client.api.utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initializeUser, updateUser } from "./userSlice";

const namespace = "auth";

export const register = createAsyncThunk(
    `${namespace}/register`,
    async ({ FirstName, LastName, Email, Password, theme }, thunkAPI) => {
        try {
            let result = await makeClientSignUpRequest(
                { FirstName, LastName, Email, Password },
                theme
            );

            if (result && (result.status === 201 || result.status === 200)) {
                emitMessage(
                    `Registered successfully! Welcome aboard, ${result.body.firstName}!`,
                    "success",
                    theme
                );

                thunkAPI.dispatch(initializeUser(result.body));

                return result.body;
            }

            emitMessage(
                `Sign up request failed with status code: ${result.status}!`,
                "error",
                theme
            );
            return thunkAPI.rejectWithValue(
                `Unexpected status: ${result.status}`
            );
        } catch (error) {
            emitMessage(
                `Sign up request failed with error message: ${error.message}!`,
                "error",
                theme
            );
            // Optional: use rejectWithValue to pass error details
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const signIn = createAsyncThunk(
    `${namespace}/signIn`,

    async ({ Email, Password, RememberMe, theme }, thunkAPI) => {
        try {
            let result = await makeClientLogInRequest({
                Email,
                Password,
                RememberMe,
            });

            if (
                result &&
                result.status === 200 &&
                result.body.accountStatus !== 1
            ) {
                emitMessage(
                    `Logged in successfully! Welcome back ${result.body.firstName}!`,
                    "success",
                    theme
                );
                thunkAPI.dispatch(initializeUser(result.body));
                return result.body;
            }

            emitMessage(
                `Log in request failed with status code: ${result.status}!`,
                "error",
                theme
            );
            return thunkAPI.rejectWithValue(
                `Unexpected error status: ${result.status}`
            );
        } catch (error) {
            emitMessage(
                `Log in request failed with error message: ${error.message}!`,
                "error",
                theme
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const checkAuthStatus = createAsyncThunk(
    `${namespace}/checkAuthStatus`,
    async (_, thunkAPI) => {
        try {
            const result = await makeClientAuthStatusCheckRequest();
            if (
                result &&
                result.status === 200 &&
                result.body.accountStatus !== 1
            ) {
                thunkAPI.dispatch(updateUser(result.body));
                return result.body;
            }
            return thunkAPI.rejectWithValue("User not authenticated!");
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    isSignedIn: false,
    firstName: null,
    normalizedName: null,
    userId: null,
    status: "idle",
    email: null,
    userType: null,
    accStatus: null,
    theme: null,
    locale: null,
    error: null,
};
export const authSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        signOut: (state) => {
            state.normalizedName = null;
            state.firstName = null;
            state.isSignedIn = false;
            state.userId = null;
            state.status = "idle";
            state.email = null;
            state.userType = null;
            state.accStatus = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isSignedIn = true;
                state.firstName = action.payload.firstName;
                state.normalizedName = action.payload.normalizedName;
                state.userId = action.payload.userId;
                state.email = action.payload.email;
                state.userType = action.payload.userType;
                state.accStatus = action.payload.accountStatus;
                state.locale = action.payload.preferredLocale;
                state.theme = action.payload.preferredTheme;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.status = "loading";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isSignedIn = true;
                state.firstName = action.payload.firstName;
                state.normalizedName = action.payload.normalizedName;
                state.userId = action.payload.userId;
                state.email = action.payload.email;
                state.userType = action.payload.userType;
                state.accStatus = action.payload.accountStatus;
                state.locale = action.payload.preferredLocale;
                state.theme = action.payload.preferredTheme;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.isSignedIn = true;
                state.firstName = action.payload.firstName;
                state.normalizedName = action.payload.normalizedName;
                state.userId = action.payload.userId;
                state.email = action.payload.email;
                state.userType = action.payload.userType;
                state.accStatus = action.payload.accountStatus;
                state.locale = action.payload.preferredLocale;
                state.theme = action.payload.preferredTheme;
            });
    },
});

export const selectUserId = (state) => state.auth.userId;
export const selectUserEmail = (state) => state.auth.email;
export const selectUserFullName = (state) => state.auth.normalizedName;
export const selectUserIsSignedIn = (state) => state.auth.isSignedIn;

export const { signOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
