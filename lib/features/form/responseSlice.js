import { emitMessage } from "@/app/(components)/NotificationToaster";
import {
    makeClientFormResponseSubmissionRequest,
    makeClientGetFormResponseByFormResponseIdRequest,
    makeClientUpdateFormResponseByFormResponseIdRequest,
} from "@/app/utils/client.api.utils";
import { transformToPascalCase } from "@/app/utils/client.utils";
import { defaultValue } from "@/constants/defaultValue";
import { mapInputType, mapInputTypeReverse } from "@/constants/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { signOut } from "../general/authSlice";
import { inputType } from "@/constants/inputType";
import { validationErrors } from "@/constants/validationErrors";

const namespace = "response";
const initialState = {
    formResponses: [],
    formResponseValidationObjects: [],
};
const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

/**
 * - selectFormResponseValidationObjectbyFormResponseId
 * - selectBlockResponseValidationByFormResponseIdBlockId
 *
 * - updateValidationStateByResponseIdBlockId
 * - resetFormResponseValidationObject
 * - resetFormResponseObject
 *
 */
// thunk
// - submitForm

export const updateResponse = createAsyncThunk(
    `${namespace}/updateResponse`,
    async ({ responseObject, theme }, thunkAPI) => {
        const processedData = cloneDeep(responseObject);
        processedData.BlockResponses.forEach((br) => {
            br.BlockType = mapInputType[br.BlockType];
        });
        var currentdate = new Date();
        processedData.RespondedAt = currentdate.toISOString();
        try {
            let result =
                await makeClientUpdateFormResponseByFormResponseIdRequest(
                    processedData.Id,
                    processedData
                );
            if (result && (result.status === 201 || result.status === 200)) {
                emitMessage(`Response updated!`, "success", theme);

                return result.body;
            } else {
                emitMessage(
                    `Response update failed with status code: ${result.status}!`,
                    "error",
                    theme
                );
                return thunkAPI.rejectWithValue(
                    `Unexpected status: ${result.status}`
                );
            }
        } catch (error) {
            emitMessage(
                `Failed to update response with error message: ${error.message}!`,
                "error",
                theme
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const initializeExistingResponseObject = createAsyncThunk(
    `${namespace}/initializeExistingResponseObject`,
    async ({ responseObjectId, mode, theme }, thunkAPI) => {
        try {
            let result = await makeClientGetFormResponseByFormResponseIdRequest(
                responseObjectId
            );
            if (result && (result.status === 201 || result.status === 200)) {
                const processedData = transformToPascalCase(result.body);

                processedData.BlockResponses.forEach((b) => {
                    b.BlockType = mapInputTypeReverse[b.BlockType];
                });

                return { ...processedData, mode: mode };
            }
        } catch (error) {
            emitMessage(
                `Failed to fetch form response with error message: ${error.message}!`,
                "error",
                theme
            );

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const submitResponse = createAsyncThunk(
    `${namespace}/submitResponse`,
    async ({ responseObject, theme }, thunkAPI) => {
        const processedData = cloneDeep(responseObject);
        processedData.BlockResponses.forEach((br) => {
            br.BlockType = mapInputType[br.BlockType];
        });
        var currentdate = new Date();
        processedData.RespondedAt = currentdate.toISOString();

        try {
            let result = await makeClientFormResponseSubmissionRequest(
                processedData
            );
            if (result && (result.status === 201 || result.status === 200)) {
                emitMessage(`Response submitted!`, "success", theme);

                return result.body;
            } else {
                emitMessage(
                    `Submission failed with status code: ${result.status}!`,
                    "error",
                    theme
                );
                return thunkAPI.rejectWithValue(
                    `Unexpected status: ${result.status}`
                );
            }
        } catch (error) {
            emitMessage(
                `Failed to submit response with error message: ${error.message}!`,
                "error",
                theme
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const responseSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        // blocks => {BlockId, BlockType}
        initializeFormResponse: (state, action) => {
            const { blocks, formId, id, userId } = action.payload;
            const blockResponses = blocks.map((b) =>
                defaultValue.newBlockResponse(
                    id,
                    b.blockType,
                    formId,
                    userId,
                    b.blockId,
                    b.isRequired
                )
            );

            state.formResponses = [
                ...state.formResponses,
                defaultValue.newFormResponse(
                    id,
                    formId,
                    userId,
                    blockResponses
                ),
            ];
        },
        initializeFormResponseValidationObject: (state, action) => {
            const { id, formId, blockResponses } = action.payload;
            const blockResponseValidationObjects = blockResponses.map((br) =>
                defaultValue.newBlockResponseValidation(
                    formId,
                    br.BlockId,
                    id,
                    [br.IsRequired && validationErrors.requiredField].filter(
                        (v) => v !== false
                    )
                )
            );
            state.formResponseValidationObjects = [
                ...state.formResponseValidationObjects,
                defaultValue.newFormResponseValidationObject(
                    formId,
                    id,
                    blockResponseValidationObjects
                ),
            ];
        },
        updateBlockResponseAnswerByBlockId: (state, action) => {
            const { id, blockId, value } = action.payload;
            // update block response
            const formResponseObject = state.formResponses.find(
                (fr) => fr.Id === id
            );

            const blockResponse = formResponseObject.BlockResponses.find(
                (br) => br.BlockId === blockId
            );
            blockResponse.Content = JSON.stringify(value);

            // update validation data
            const formResponseValidationObject =
                state.formResponseValidationObjects.find(
                    (frvo) => frvo.ResponseObjectId === id
                );

            const blockResponseValidationObj =
                formResponseValidationObject.BlockResponseValidationObjects.find(
                    (brvo) => brvo.BlockId === blockId
                );
            if (value.length === 0 && blockResponse.IsRequired === true) {
                blockResponseValidationObj.Errors = [
                    validationErrors.requiredField,
                ];
            } else if (
                blockResponse.BlockType === inputType[2] &&
                Number.isNaN(value)
            ) {
                blockResponseValidationObj.Errors = [
                    validationErrors.notANumber,
                ];
            } else {
                blockResponseValidationObj.Errors = [];
            }
        },
        resetFormResponseObject: (state, action) => {
            state.formResponses = state.formResponses.filter(
                (fr) => fr.Id !== action.payload.id
            );
        },
        resetFormResponseValidationObject: (state, action) => {
            state.formResponseValidationObject =
                state.formResponseValidationObjects.filter(
                    (frvo) => frvo.ResponseObjectId !== action.payload.id
                );
        },
        toggleValidationErrorByBlockId: (state, action) => {
            const { id, blockId, value } = action.payload;
            const formResponseValidationObject =
                state.response.formResponseValidationObjects.find(
                    (frvo) => frvo.ResponseObjectId === id
                );
            const blockResponseValidationObj =
                formResponseValidationObject.BlockResponseValidationObjects.find(
                    (brvo) => brvo.BlockId === blockId
                );
            blockResponseValidationObj.ShowError = value;
        },
        toggleValidationErrorForAllBlocks: (state, action) => {
            const { id, value } = action.payload;
            const formResponseValidationObject =
                state.response.formResponseValidationObjects.find(
                    (frvo) => frvo.ResponseObjectId === id
                );
            formResponseValidationObject.BlockResponseValidationObjects.forEach(
                (item) => {
                    item.ShowError = value;
                }
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                initializeExistingResponseObject.fulfilled,
                (state, action) => {
                    state.formResponses = [
                        ...state.formResponses,
                        {
                            Id: action.payload.Id,
                            ParentTemplateId: action.payload.ParentTemplateId,
                            RespondentId: action.payload.RespondentId,
                            RespondedAt: action.payload.RespondedAt,
                            BlockResponses: action.payload.BlockResponses,
                            mode: action.payload.mode,
                        },
                    ];
                }
            )
            .addCase(initializeExistingResponseObject.rejected, () => {
                console.log("ERROR Loading ResponseObject!!!!!!!!!!!!");
            })
            .addCase(signOut, () => {
                return initialState;
            });
    },
});

export const selectFormResponseBlocks = (state, id) => {
    const formResponseObject = state.response.formResponses.find(
        (fr) => fr.Id === id
    );
    return !formResponseObject
        ? EMPTY_ARRAY
        : formResponseObject.BlockResponses;
};

export const selectFormResponseObject = (state, id) => {
    const formResponseObject = state.response.formResponses.find(
        (fr) => fr.Id === id
    );

    return !formResponseObject ? EMPTY_OBJECT : formResponseObject;
};

export const selectResponseMode = (state, id) => {
    const formResponseObject = state.response.formResponses.find(
        (fr) => fr.Id === id
    );

    return !formResponseObject ? EMPTY_OBJECT : formResponseObject.mode;
};

export const selectFormResponseValidationObjectbyFormResponseId = (
    state,
    id
) => {
    const formResponseValidationObject =
        state.response.formResponseValidationObjects.find(
            (frvo) => frvo.ResponseObjectId === id
        );
    return !formResponseValidationObject
        ? EMPTY_OBJECT
        : formResponseValidationObject;
};

export const selectBlockResponseValidationByFormResponseIdBlockId = (
    state,
    id,
    blockId
) => {
    const formResponseValidationObject =
        state.response.formResponseValidationObjects.find(
            (frvo) => frvo.ResponseObjectId === id
        );
    const blockResponseValidationObj = formResponseValidationObject
        ? formResponseValidationObject.BlockResponseValidationObjects.find(
              (brvo) => brvo.BlockId === blockId
          )
        : EMPTY_OBJECT;
    return blockResponseValidationObj
        ? blockResponseValidationObj
        : EMPTY_OBJECT;
};

export const {
    initializeFormResponse,
    updateBlockResponseAnswerByBlockId,
    initializeFormResponseValidationObject,
    resetFormResponseObject,
    resetFormResponseValidationObject,
    toggleValidationErrorByBlockId,
    toggleValidationErrorForAllBlocks,
} = responseSlice.actions;
export const responseReducer = responseSlice.reducer;
