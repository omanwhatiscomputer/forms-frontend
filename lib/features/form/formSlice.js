import { duplicateBlock } from "@/app/utils/client.utils";
import { defaultValue, markdownDefault } from "@/constants/defaultValue";
import { questionType } from "@/constants/questionType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";

import { signOut } from "../general/authSlice";

const namespace = "form";

/**
 * ThunkFunctions
 *  - updateForm (save old)
 *  - createForm (save)
 *  - fetchFormForUpdating
 *
 * Actions:
 *  - updateFormTitle
 *  - updateFormDescription
 *  - updateFormBannerUrl
 *  - updateAccessControl
 *  - updateFormTopic
 *  - initializeForm
 *
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
 *  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 *
 *  - addExistingTagToForm
 *  - removeFormTag
 *
 */

const initialState = {
    forms: [],
};
const EMPTY_BLOCKS = [];

// export const selectFormTitle = (state, id) =>
//     state.form.forms.find((f) => f.Id === id).Title;
// export const selectFormDescription = (state, id) =>
//     state.form.forms.find((f) => f.Id === id).Description;
// export const selectFormBannerUrl = (state, id) =>
//     state.form.forms.find((f) => f.Id === id).BannerUrl;
// export const selectFormTopic = (state, id) =>
//     state.form.forms.find((f) => f.Id === id).Topic;
// export const selectFormAccessControl = (state, id) =>
//     state.form.forms.find((f) => f.Id === id).AccessControl;
// export const selectFormBlocks = (state, id) =>
//     state.form.forms.find((f) => f.Id === id).Blocks;
export const selectFormTitle = (state, id) =>
    !state.form.forms.find((f) => f.Id === id)
        ? ""
        : state.form.forms.find((f) => f.Id === id).Title;
export const selectFormDescription = (state, id) =>
    !state.form.forms.find((f) => f.Id === id)
        ? markdownDefault
        : state.form.forms.find((f) => f.Id === id).Description;
export const selectFormBannerUrl = (state, id) =>
    !state.form.forms.find((f) => f.Id === id)
        ? ""
        : state.form.forms.find((f) => f.Id === id).BannerUrl;
export const selectFormTopic = (state, id) =>
    !state.form.forms.find((f) => f.Id === id)
        ? ""
        : state.form.forms.find((f) => f.Id === id).Topic;
export const selectFormAccessControl = (state, id) =>
    !state.form.forms.find((f) => f.Id === id)
        ? ""
        : state.form.forms.find((f) => f.Id === id).AccessControl;
export const selectFormBlocks = (state, id) =>
    !state.form.forms.find((f) => f.Id === id)
        ? EMPTY_BLOCKS
        : state.form.forms.find((f) => f.Id === id).Blocks;

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
    return !form ? EMPTY_BLOCKS : form.Tags;
};
// ------------------

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
                    defaultValue.newBlock(action.payload.id)
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
    },
    extraReducers: (builder) => {
        // eslint-disable-next-line no-unused-vars
        builder.addCase(signOut, (state) => {
            return initialState;
        });
    },
});

export const {
    addNewFormTag,
    initializeForm,
    updateFormTitle,
    updateFormTopic,
    updateFormBannerUrl,
    updateFormDescription,
    updateFormAccessControl,
    addExistingUserTagToForm,
    updateBlockTitleByBlockId,
    updateBlockRequiredByBlockId,
    addNewQuestionFieldByBlockId,
    updateBlockInputTypeByBlockId,
    addNewCheckboxOptionByBlockId,
    updateBlockDescriptionByBlockId,
    deleteCheckboxOptionByBlockIdCheckboxId,
    deleteQuestionFieldByBlockIdQuestionFieldId,
    updateQuestionFieldByBlockIdQuestionFieldId,
    updateCheckboxFieldIncludesImageByBlockIdCheckboxId,
    updateCheckboxFieldTextInputByBlockIdCheckboxFieldId,
    insertNewQuestionFieldUnderQuestionFieldByBlockIdQuestionFieldId,
    insertNewBlockUnderBlockWithBlockId,
    insertDuplicateBlockUnderBlockWithBlockId,
    deleteBlockByBlockId,
    removeUserTagFromForm,
} = formSlice.actions;
export const formReducer = formSlice.reducer;
