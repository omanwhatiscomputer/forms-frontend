import {
    duplicateBlock,
    postprocess,
    transformToPascalCase,
} from "@/app/utils/client.utils";
import { defaultValue } from "@/constants/defaultValue";
import { questionType } from "@/constants/questionType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";

import { signOut } from "../general/authSlice";
import {
    mapAccessControl,
    mapAccessControlReverse,
    mapInputType,
    mapInputTypeReverse,
    postprocessOpts,
} from "@/constants/misc";
import { emitMessage } from "@/app/(components)/NotificationToaster";
import {
    makeClientFormCreationRequest,
    makeClientGetFormByFormIdRequest,
    makeClientUpdateFormByFormIdRequest,
} from "@/app/utils/client.api.utils";
import { formMode } from "@/constants/formMode";

const namespace = "form";

/**
 *
 *  Actions:
 *  - updateFormTitle
 *  - updateFormDescription
 *  - updateFormBannerUrl
 *  - updateAccessControl
 *  - updateFormTopic
 *  - initializeForm
 *  - updateBlockTitleByBlockId
 *  - updateCheckboxOptionByBlockIdCheckboxId
 *  - updateBlockDescriptionByBlockId
 *  - updateBlockInputTypeByBlockId
 *  - updateBlockIsRequiredByBlockId
 *  - updateQuestionFieldByBlockIdQuestionFieldId
 *  - updateCheckboxFieldIncludesImageByBlockIdCheckboxId
 *  - addNewQuestionFieldByBlockId
 *  - insertNewQuestionFieldUnderQuestionFieldByBlockIdQuestionFieldId
 *  - deleteQuestionFieldByBlockIdQuestionFieldId
 *  - addNewCheckboxOptionByBlockId
 *  - deleteCheckboxOptionByBlockIdCheckboxId
 *  - insertNewBlockUnderBlockWithBlockId
 *  - insertDuplicateBlockUnderBlockWithBlockId
 *  - deleteBlockByBlockId
 *  - removeFormTag
 *  - addExistingTagToForm
 *  - reorderCheckboxOptions
 *  - reorderQuestionFields
 *  - reorderBlocks
 *  - removeAuthorizedUser
 *  - addAuthorizedUser
 *  - resetForm
 *
 *  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 *  ThunkFunctions
 *  - createForm (save)
 *  - updateForm (save old)
 *  - fetchFormForUpdating
 *
 *
 */

const initialState = {
    forms: [],
};
const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

// ------------------
export const saveForm = createAsyncThunk(
    `${namespace}/saveForm`,
    async ({ form, userId, theme, router }, thunkAPI) => {
        let processedData = cloneDeep(form);

        postprocess(processedData, postprocessOpts.SERIALIZE);
        processedData.AccessControl =
            mapAccessControl[processedData.AccessControl];
        processedData.Blocks.forEach((b) => {
            b.BlockType = mapInputType[b.BlockType];
        });
        if (form.mode === formMode.create) {
            processedData = {
                ...processedData,
                AuthorId: userId,
            };
        }

        processedData.Blocks = processedData.Blocks.map((b, idx) => ({
            ...b,
            Index: idx,
        }));

        try {
            if (processedData.mode === formMode.create) {
                let result = await makeClientFormCreationRequest(processedData);
                if (
                    result &&
                    (result.status === 201 || result.status === 200)
                ) {
                    emitMessage(`Form template saved!`, "success", theme);
                    router.push("/dashboard");

                    return result.body;
                }
            } else if (processedData.mode === formMode.update) {
                let result = await makeClientUpdateFormByFormIdRequest(
                    processedData.Id,
                    processedData
                );
                if (
                    result &&
                    (result.status === 201 || result.status === 200)
                ) {
                    emitMessage(`Form template saved!`, "success", theme);

                    return result.body;
                }
            }
        } catch (error) {
            emitMessage(
                `Failed to save form template with error message: ${error.message}!`,
                "error",
                theme
            );

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const initializeExistingForm = createAsyncThunk(
    `${namespace}/initializeFormBeforeUpdate`,
    async ({ formId, theme, mode }, thunkAPI) => {
        try {
            const result = await makeClientGetFormByFormIdRequest(formId);
            if (result && (result.status === 201 || result.status === 200)) {
                result.body.blocks.sort((a, b) => a.index - b.index);
                const processedData = transformToPascalCase(result.body);
                postprocess(processedData, postprocessOpts.DESERIALIZE);

                processedData.AccessControl =
                    mapAccessControlReverse[processedData.AccessControl];
                processedData.Blocks.forEach((b) => {
                    b.BlockType = mapInputTypeReverse[b.BlockType];
                });

                return { ...processedData, mode: mode };
            }
        } catch (error) {
            emitMessage(
                `Failed to fetch form template with error message: ${error.message}!`,
                "error",
                theme
            );

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ------------------

export const selectFormTitle = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? "" : form.Title;
};
export const selectFormDescription = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? "" : form.Description;
};
export const selectFormBannerUrl = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? "" : form.BannerUrl;
};
export const selectFormTopic = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? "" : form.Topic;
};
export const selectFormAccessControl = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? "" : form.AccessControl;
};
export const selectFormBlocks = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? EMPTY_ARRAY : form.Blocks;
};
export const selectBlockById = (state, id, bId) =>
    state.form.forms.find((f) => f.Id === id).Blocks.find((b) => b.Id === bId);
export const selectBlockInputTypeByBlockId = (state, id, bId) =>
    state.form.forms.find((f) => f.Id === id).Blocks.find((b) => b.Id === bId)
        .BlockType;
export const selectBlockRequiredByBlockId = (state, id, bId) =>
    state.form.forms.find((f) => f.Id === id).Blocks.find((b) => b.Id === bId)
        .IsRequired;
export const selectBlockTitleByBlockId = (state, id, bId) =>
    state.form.forms.find((f) => f.Id === id).Blocks.find((b) => b.Id === bId)
        .Title;
export const selectBlockDescriptionByBlockId = (state, id, bId) =>
    state.form.forms.find((f) => f.Id === id).Blocks.find((b) => b.Id === bId)
        .Description;
export const selectQuestionGroupByBlockId = (state, id, bId) =>
    state.form.forms.find((f) => f.Id === id).Blocks.find((b) => b.Id === bId)
        .QuestionGroup;
export const selectCheckboxOptionsByBlockId = (state, id, bId) =>
    state.form.forms.find((f) => f.Id === id).Blocks.find((b) => b.Id === bId)
        .CheckboxOptions;

export const selectFormTags = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? EMPTY_ARRAY : form.Tags;
};
export const selectFormAuthorizedUsers = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? EMPTY_ARRAY : form.AuthorizedUsers;
};
export const selectForm = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? EMPTY_OBJECT : form;
};
export const selectFormMode = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? "" : form.mode;
};
export const selectAuthorId = (state, id) => {
    const form = state.form.forms.find((f) => f.Id === id);
    return !form ? null : form.AuthorId;
};

//------------------
export const formSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        initializeForm: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            if (form) return;
            state.forms = [
                ...state.forms,
                defaultValue.newForm(
                    action.payload.id,
                    action.payload.mode,
                    defaultValue.newBlock(action.payload.id),
                    action.payload.userId
                ),
            ];
        },
        addNewFormTag: (state, action) => {
            const form = state.forms.find(
                (f) => f.Id === action.payload.tag.FormTemplateId
            );
            form.Tags = [...form.Tags, action.payload.tag];
        },
        updateFormTitle: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            form.Title = action.payload.title;
        },
        updateFormDescription: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            form.Description = action.payload.value;
        },
        updateFormTopic: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            form.Topic = action.payload.topic;
        },
        updateFormBannerUrl: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            form.BannerUrl = action.payload.url;
        },
        updateFormAccessControl: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            form.AccessControl = action.payload.accessControl;
        },
        updateBlockInputTypeByBlockId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            block.BlockType = action.payload.value;
        },
        updateBlockRequiredByBlockId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            block.IsRequired = action.payload.value;
        },
        updateBlockTitleByBlockId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            block.Title = action.payload.value;
        },
        updateBlockDescriptionByBlockId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            block.Description = action.payload.value;
        },
        updateQuestionFieldByBlockIdQuestionFieldId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            const questionField = block.QuestionGroup.find(
                (qg) => qg.Id === action.payload.qId
            );
            questionField.Content = action.payload.value;
        },
        updateCheckboxFieldTextInputByBlockIdCheckboxFieldId: (
            state,
            action
        ) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            const checkboxField = block.CheckboxOptions.find(
                (co) => co.Id === action.payload.cbId
            );
            checkboxField.Content = action.payload.value;
        },
        updateCheckboxFieldIncludesImageByBlockIdCheckboxId: (
            state,
            action
        ) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            const checkboxField = block.CheckboxOptions.find(
                (co) => co.Id === action.payload.cbId
            );
            checkboxField.IncludesImage = action.payload.value;
            checkboxField.ImageUrl = action.payload.url;
        },
        addNewQuestionFieldByBlockId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            block.QuestionGroup = [
                ...block.QuestionGroup,
                action.payload.qtype === questionType.image
                    ? defaultValue.newQuestionFieldWithImage(
                          block.Id,
                          action.payload.url
                      )
                    : defaultValue.newQuestionField(block.Id),
            ];
        },
        insertNewQuestionFieldUnderQuestionFieldByBlockIdQuestionFieldId: (
            state,
            action
        ) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            const qIndex = block.QuestionGroup.findIndex(
                (qg) => qg.Id === action.payload.qId
            );
            block.QuestionGroup.splice(
                qIndex + 1,
                0,
                action.payload.qtype === questionType.image
                    ? defaultValue.newQuestionFieldWithImage(
                          block.Id,
                          action.payload.url
                      )
                    : defaultValue.newQuestionField(block.Id)
            );
        },
        deleteQuestionFieldByBlockIdQuestionFieldId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            block.QuestionGroup = block.QuestionGroup.filter(
                (qg) => qg.Id !== action.payload.qId
            );
        },
        addNewCheckboxOptionByBlockId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            block.CheckboxOptions = [
                ...block.CheckboxOptions,
                defaultValue.newCheckboxOption(),
            ];
        },
        deleteCheckboxOptionByBlockIdCheckboxId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            if (block.CheckboxOptions.length === 1) return;
            block.CheckboxOptions = block.CheckboxOptions.filter(
                (co) => co.Id !== action.payload.cbId
            );
        },
        insertNewBlockUnderBlockWithBlockId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const bIndex = form.Blocks.findIndex(
                (b) => b.Id === action.payload.bId
            );

            form.Blocks.splice(bIndex + 1, 0, defaultValue.newBlock(form.Id));
        },
        insertDuplicateBlockUnderBlockWithBlockId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const bIndex = form.Blocks.findIndex(
                (b) => b.Id === action.payload.bId
            );
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);

            let dupeBlock = duplicateBlock(cloneDeep(block));

            form.Blocks.splice(bIndex + 1, 0, dupeBlock);
        },
        deleteBlockByBlockId: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            if (form.Blocks.length === 1) return;
            form.Blocks = form.Blocks.filter(
                (b) => b.Id !== action.payload.bId
            );
        },
        removeUserTagFromForm: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            form.Tags = form.Tags.filter(
                (t) => t.TagName !== action.payload.tagName
            );
        },
        addExistingUserTagToForm: (state, action) => {
            const form = state.forms.find(
                (f) => f.Id === action.payload.tag.FormTemplateId
            );
            form.Tags = [...form.Tags, action.payload.tag];
        },
        reorderCheckboxOptions: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            block.CheckboxOptions = action.payload.cos;
        },
        reorderQuestionGroup: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            const block = form.Blocks.find((b) => b.Id === action.payload.bId);
            block.QuestionGroup = action.payload.bqg;
        },
        reorderFormBlock: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            form.Blocks = action.payload.blocks;
        },
        addAuthorizedUser: (state, action) => {
            const form = state.forms.find(
                (f) => f.Id === action.payload.au.FormTemplateId
            );
            form.AuthorizedUsers = [...form.AuthorizedUsers, action.payload.au];
        },
        removeAuthorizedUser: (state, action) => {
            const form = state.forms.find((f) => f.Id === action.payload.id);
            form.AuthorizedUsers = form.AuthorizedUsers.filter(
                (au) => au.Email !== action.payload.email
            );
        },
        resetForm: (state, action) => {
            state.forms = state.forms.filter((f) => f.Id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        // eslint-disable-next-line no-unused-vars
        builder
            .addCase(signOut, () => {
                return initialState;
            })
            .addCase(initializeExistingForm.fulfilled, (state, action) => {
                state.forms = [
                    ...state.forms,
                    {
                        Id: action.payload.Id,
                        Title: action.payload.Title,
                        AuthorId: action.payload.AuthorId,
                        AuthorizedUsers: action.payload.AuthorizedUsers,
                        Tags: action.payload.Tags,
                        Description: action.payload.Description,
                        Topic: action.payload.Topic.TopicName,
                        BannerUrl: action.payload.BannerUrl,
                        mode: action.payload.mode,
                        Blocks: action.payload.Blocks,
                        AccessControl: action.payload.AccessControl,
                        CreatedAt: action.payload.CreatedAt,
                    },
                ];
            })
            .addCase(initializeExistingForm.rejected, () => {
                console.log("ERROR!!!!!!!!!!!!");
            });
    },
});

export const {
    addNewFormTag,
    initializeForm,
    updateFormTitle,
    updateFormTopic,
    reorderFormBlock,
    addAuthorizedUser,
    updateFormBannerUrl,
    removeAuthorizedUser,
    deleteBlockByBlockId,
    reorderQuestionGroup,
    updateFormDescription,
    removeUserTagFromForm,
    reorderCheckboxOptions,
    updateFormAccessControl,
    addExistingUserTagToForm,
    updateBlockTitleByBlockId,
    updateBlockRequiredByBlockId,
    addNewQuestionFieldByBlockId,
    updateBlockInputTypeByBlockId,
    addNewCheckboxOptionByBlockId,
    updateBlockDescriptionByBlockId,
    insertNewBlockUnderBlockWithBlockId,
    deleteCheckboxOptionByBlockIdCheckboxId,
    insertDuplicateBlockUnderBlockWithBlockId,
    deleteQuestionFieldByBlockIdQuestionFieldId,
    updateQuestionFieldByBlockIdQuestionFieldId,
    updateCheckboxFieldIncludesImageByBlockIdCheckboxId,
    updateCheckboxFieldTextInputByBlockIdCheckboxFieldId,
    insertNewQuestionFieldUnderQuestionFieldByBlockIdQuestionFieldId,
    resetForm,
} = formSlice.actions;
export const formReducer = formSlice.reducer;
