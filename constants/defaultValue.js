import { v4 as uuidv4 } from "uuid";

import { responseMode } from "./responseMode";

export const richtextDefault = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];

export const defaultValue = {
    newQuestionField: (blockId) => ({
        BlockId: blockId,
        Id: uuidv4(),
        Type: "RichText",
        Content: richtextDefault,
    }),
    newQuestionFieldWithImage: (blockId, url) => ({
        BlockId: blockId,
        Id: uuidv4(),
        Type: "Image",
        Content: url || "",
    }),
    newCheckboxOption: (blockId) => ({
        Id: uuidv4(),
        BlockId: blockId,
        Content: "",
        IncludesImage: false,
        ImageUrl: "",
    }),
    newBlock: (templateId) => {
        const newBlockId = uuidv4();
        return {
            Id: newBlockId,
            Title: "",
            Description: richtextDefault,
            ParentTemplateId: templateId,
            IsRequired: false,
            BlockType: "Single-line",
            QuestionGroup: [
                {
                    Id: uuidv4(),
                    BlockId: newBlockId,
                    Type: "RichText",
                    Content: richtextDefault,
                },
                // {
                //     Id: uuidv4(),
                //     BlockId: newBlockId,
                //     Type: "Image",
                //     Content: "https://random.imagecdn.app/500/150",
                // },
            ],
            CheckboxOptions: [
                {
                    Id: uuidv4(),
                    BlockId: newBlockId,
                    Content: "",
                    IncludesImage: false,
                    ImageUrl: "",
                },
                // {
                //     Id: uuidv4(),
                //     BlockId: newBlockId,
                //     Content: "",
                //     IncludesImage: true,
                //     ImageUrl:
                //         "https://fakeimg.pl/600x400/f0cece/909090?font=lobster",
                // },
            ],
        };
    },
    newForm: (id, mode, block, userId) => ({
        Id: id,
        Title: "",
        AuthorId: userId,
        AuthorizedUsers: [],
        Tags: [],
        Description: "",
        Topic: "Education",
        BannerUrl: "https://fakeimg.pl/600x400/f0cece/909090?font=lobster",
        AccessControl: "Private",
        Blocks: [block],
        CreatedAt: null,
        mode: mode,
    }),
    newBlockResponse: (
        responseId,
        blockType,
        formId,
        userId,
        blockId,
        isRequired
    ) => ({
        Id: uuidv4(),
        ResponseObjectId: responseId,
        ParentTemplateId: formId,
        RespondentId: userId,
        BlockId: blockId,
        BlockType: blockType,
        Content: "",
        IsRequired: isRequired,
    }),
    newFormResponse: (
        id,
        formId,
        userId,
        blockResponses,
        mode = responseMode.create
    ) => ({
        Id: id,
        ParentTemplateId: formId,
        RespondentId: userId,
        RespondedAt: null,
        BlockResponses: blockResponses,
        mode: mode,
    }),
    newBlockResponseValidation: (formId, blockId, responseId, errors) => ({
        Id: uuidv4(),
        ParentTemplateId: formId,
        ResponseObjectId: responseId,
        BlockId: blockId,
        Errors: errors,
        ShowError: false,
    }),
    newFormResponseValidationObject: (
        formId,
        responseId,
        blockResponseValidationObjects
    ) => ({
        Id: uuidv4(),
        ParentTemplateId: formId,
        ResponseObjectId: responseId,
        BlockResponseValidationObjects: blockResponseValidationObjects,
        ReadyForSubmission: false,
    }),
};
