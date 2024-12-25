import { emitMessage } from "@/app/(components)/NotificationToaster";
import { makeClientRegisterNewUserTagRequest } from "@/app/utils/client.api.utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewFormTag } from "../form/formSlice";
import { signOut } from "./authSlice";
const namespace = "user";

const initialState = {
    tagStatus: "idle",
    error: null,
    Tags: [],
    Likes: [],
    FormsRespondedTo: [],
    AuthorizedForms: [],
    FormTemplates: [],
};

// thunk function: add userTag
export const registerNewUserTag = createAsyncThunk(
    `${namespace}/registerNewUserTag`,
    async ({ UserId, TagName, FormTemplateId, theme }, thunkAPI) => {
        try {
            let result = await makeClientRegisterNewUserTagRequest({
                UserId,
                TagName,
            });
            if (result && result.status < 300) {
                emitMessage(
                    `New tag ${TagName} has been successfully added!`,
                    "success",
                    theme
                );
                thunkAPI.dispatch(
                    addNewFormTag({
                        FormTemplateId: FormTemplateId,
                        AuthorId: UserId,
                        TagName: TagName,
                        UserTagId: result.body.Id,
                    })
                );
                return result.body;
            }
            emitMessage(
                `Failed to add new tag with status code: ${result.status}!`,
                "error",
                theme
            );
            return thunkAPI.rejectWithValue(
                `Unexpected error status: ${result.status}`
            );
        } catch (error) {
            emitMessage(
                `New tag add request failed with error message: ${error.message}!`,
                "error",
                theme
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        initializeUser: (state, action) => {
            state.Tags = action.payload.tags;
            state.Likes = action.payload.likes;
            state.FormsRespondedTo = action.payload.FormsRespondedTo;
            state.FormTemplates = action.payload.formTemplates;
            state.AuthorizedForms = action.payload.authorizedForms;
        },
        updateUser: (state, action) => {
            state.Tags = action.payload.tags;
            state.Likes = action.payload.likes;
            state.FormsRespondedTo = action.payload.FormsRespondedTo;
            state.FormTemplates = action.payload.formTemplates;
            state.AuthorizedForms = action.payload.authorizedForms;
        },
    },
    extraReducers: (builder) => {
        builder
            // eslint-disable-next-line no-unused-vars
            .addCase(signOut, (state) => {
                return initialState;
            })
            .addCase(registerNewUserTag.pending, (state) => {
                state.tagStatus = "loading";
            })
            .addCase(registerNewUserTag.fulfilled, (state, action) => {
                state.tagStatus = "succeeded";
                state.Tags = [...state.Tags, action.payload];
            })
            .addCase(registerNewUserTag.rejected, (state, action) => {
                state.tagStatus = "failed";
                state.error = action.error.message;
            });
    },
});

export const { initializeUser, updateUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectUserTags = (state) => state.user.Tags;

// TODO define selector functions
// TODO implement userTags
