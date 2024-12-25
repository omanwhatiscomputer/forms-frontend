import { duplicateBlock } from "@/app/utils/client.utils";
import { defaultValue, markdownDefault } from "@/constants/defaultValue";
import { questionType } from "@/constants/questionType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
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
    Id: null,
    Title: "",
    Tags: [],
    Description: markdownDefault,
    Topic: "Education",
    BannerUrl: "https://fakeimg.pl/600x400/f0cece/909090?font=lobster",
    AccessControl: "Private",
    Blocks: [],
};

export const selectFormTitle = (state) => state.form.Title;
export const selectFormDescription = (state) => state.form.Description;
export const selectBlockById = (state, id) =>
    state.form.Blocks.find((b) => b.Id === id);
export const selectFormBannerUrl = (state) => state.form.BannerUrl;
export const selectFormId = (state) => state.form.Id;
export const selectFormTopic = (state) => state.form.Topic;
export const selectFormAccessControl = (state) => state.form.AccessControl;
export const selectFormBlocks = (state) => state.form.Blocks;
export const selectBlockInputTypeByBlockId = (state, id) =>
    state.form.Blocks.find((b) => b.Id === id).BlockType;
export const selectBlockRequiredByBlockId = (state, id) =>
    state.form.Blocks.find((b) => b.Id === id).IsRequired;
export const selectBlockTitleByBlockId = (state, id) =>
    state.form.Blocks.find((b) => b.Id === id).Title;
export const selectBlockDescriptionByBlockId = (state, id) =>
    state.form.Blocks.find((b) => b.Id === id).Description;
export const selectQuestionGroupByBlockId = (state, id) =>
    state.form.Blocks.find((b) => b.Id === id).QuestionGroup;
export const selectCheckboxOptionsByBlockId = (state, id) =>
    state.form.Blocks.find((b) => b.Id === id).CheckboxOptions;
// ------------------

//------------------
export const formSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        addNewFormTag: (state, action) => {
            state.Tags = [...state.Tags, action.payload];
        },
        updateFormTitle: (state, action) => {
            state.Title = action.payload;
        },
        updateFormDescription: (state, action) => {
            state.Description = action.payload;
        },
        updateFormTopic: (state, action) => {
            state.Topic = action.payload;
        },
        updateFormBannerUrl: (state, action) => {
            state.BannerUrl = action.payload.url;
        },
        updateFormAccessControl: (state, action) => {
            state.AccessControl = action.payload;
        },
        updateBlockInputTypeByBlockId: (state, action) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            block.BlockType = action.payload.value;
        },
        updateBlockRequiredByBlockId: (state, action) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            block.IsRequired = action.payload.value;
        },
        updateBlockTitleByBlockId: (state, action) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            block.Title = action.payload.value;
        },
        updateBlockDescriptionByBlockId: (state, action) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            block.Description = action.payload.value;
        },
        updateQuestionFieldByBlockIdQuestionFieldId: (state, action) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            const questionField = block.QuestionGroup.find(
                (qg) => qg.Id === action.payload.qId
            );
            questionField.Content = action.payload.value;
        },
        updateCheckboxFieldTextInputByBlockIdCheckboxFieldId: (
            state,
            action
        ) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            const checkboxField = block.CheckboxOptions.find(
                (co) => co.Id === action.payload.cbId
            );
            checkboxField.Content = action.payload.value;
        },
        updateCheckboxFieldIncludesImageByBlockIdCheckboxId: (
            state,
            action
        ) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            const checkboxField = block.CheckboxOptions.find(
                (co) => co.Id === action.payload.cbId
            );
            checkboxField.IncludesImage = action.payload.value;
            checkboxField.ImageUrl = action.payload.url;
        },
        initializeForm: (state) => {
            state.Id = uuidv4();
            state.Title = "";
            state.Description = markdownDefault;
            state.Topic = "Education";
            state.BannerUrl =
                "https://fakeimg.pl/600x400/f0cece/909090?font=lobster";
            state.AccessControl = "Private";
            state.Blocks = [defaultValue.newBlock(state.Id)];
        },
        addNewQuestionFieldByBlockId: (state, action) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
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
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
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
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            block.QuestionGroup = block.QuestionGroup.filter(
                (qg) => qg.Id !== action.payload.qId
            );
        },
        addNewCheckboxOptionByBlockId: (state, action) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            block.CheckboxOptions = [
                ...block.CheckboxOptions,
                defaultValue.newCheckboxOption(),
            ];
        },
        deleteCheckboxOptionByBlockIdCheckboxId: (state, action) => {
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            if (block.CheckboxOptions.length === 1) return;
            block.CheckboxOptions = block.CheckboxOptions.filter(
                (co) => co.Id !== action.payload.cbId
            );
        },
        insertNewBlockUnderBlockWithBlockId: (state, action) => {
            const bIndex = state.Blocks.findIndex(
                (b) => b.Id === action.payload.id
            );

            state.Blocks.splice(bIndex + 1, 0, defaultValue.newBlock(state.Id));
        },
        insertDuplicateBlockUnderBlockWithBlockId: (state, action) => {
            const bIndex = state.Blocks.findIndex(
                (b) => b.Id === action.payload.id
            );
            const block = state.Blocks.find((b) => b.Id === action.payload.id);
            const dupeBlock = duplicateBlock(JSON.parse(JSON.stringify(block)));
            state.Blocks.splice(bIndex + 1, 0, dupeBlock);
        },
        deleteBlockByBlockId: (state, action) => {
            if (state.Blocks.length === 1) return;
            state.Blocks = state.Blocks.filter(
                (b) => b.Id !== action.payload.id
            );
        },
        removeUserTagFromForm: (state, action) => {
            state.Tags = state.Tags.filter((t) => t.TagName !== action.payload);
        },
        addExistingUserTagToForm: (state, action) => {
            state.Tags = [...state.Tags, action.payload];
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
} = formSlice.actions;
export const formReducer = formSlice.reducer;
