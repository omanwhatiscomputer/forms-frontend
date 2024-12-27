import { v4 as uuidv4 } from "uuid";

export const markdownDefault = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];
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
                {
                    Id: uuidv4(),
                    BlockId: newBlockId,
                    Type: "Image",
                    Content: "https://random.imagecdn.app/500/150",
                },
            ],
            CheckboxOptions: [
                {
                    Id: uuidv4(),
                    BlockId: newBlockId,
                    Content: "content",
                    IncludesImage: false,
                    ImageUrl: "",
                },
                {
                    Id: uuidv4(),
                    BlockId: newBlockId,
                    Content: "content",
                    IncludesImage: true,
                    ImageUrl:
                        "https://fakeimg.pl/600x400/f0cece/909090?font=lobster",
                },
            ],
        };
    },
    newForm: (id, mode, block) => ({
        Id: id,
        Title: "",
        Tags: [],
        Description: markdownDefault,
        Topic: "Education",
        BannerUrl: "https://fakeimg.pl/600x400/f0cece/909090?font=lobster",
        AccessControl: "Private",
        Blocks: [block],
        mode: mode,
    }),
};
