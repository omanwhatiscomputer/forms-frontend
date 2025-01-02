/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import RichTextInput from "../../RichTextInput";
import FormButton from "../FormButton";

import { RxText } from "react-icons/rx";
import { FiImage } from "react-icons/fi";
import { RiDeleteBin3Fill } from "react-icons/ri";
import Image from "next/image";

import {
    deleteQuestionFieldByBlockIdQuestionFieldId,
    insertNewQuestionFieldUnderQuestionFieldByBlockIdQuestionFieldId,
    selectFormMode,
    updateQuestionFieldByBlockIdQuestionFieldId,
} from "@/lib/features/form/formSlice";
import { useSelector } from "react-redux";
import { formMode } from "@/constants/formMode";

const QuestionField = ({ type, content, blockId, questionId, formId }) => {
    const mode = useSelector((state) => selectFormMode(state, formId));
    const renderButtons = () => {
        return (
            <>
                <FormButton
                    formId={formId}
                    type={"button"}
                    className="text-2xl text-foreground bg-slate-200 dark:bg-gray-900 p-1 rounded-sm hover:bg-slate-300 hover:dark:bg-gray-800 hover:text-primary"
                    blockId={blockId}
                    questionId={questionId}
                    action={
                        insertNewQuestionFieldUnderQuestionFieldByBlockIdQuestionFieldId
                    }
                >
                    <RxText />
                </FormButton>
                <FormButton
                    formId={formId}
                    action={
                        insertNewQuestionFieldUnderQuestionFieldByBlockIdQuestionFieldId
                    }
                    blockId={blockId}
                    questionId={questionId}
                    forImageUpload={true}
                    type={"button"}
                    className="text-2xl text-foreground bg-slate-200 dark:bg-gray-900 p-1 rounded-sm hover:bg-slate-300 hover:dark:bg-gray-800 hover:text-primary ml-[7px]"
                >
                    <FiImage />
                </FormButton>
                <FormButton
                    formId={formId}
                    blockId={blockId}
                    questionId={questionId}
                    action={deleteQuestionFieldByBlockIdQuestionFieldId}
                    type={"button"}
                    className="text-2xl text-foreground bg-slate-200 dark:bg-gray-900 p-1 rounded-sm hover:bg-slate-300 hover:dark:bg-gray-800 hover:text-primary ml-[7px]"
                >
                    <RiDeleteBin3Fill />
                </FormButton>
            </>
        );
    };

    if (type === "Image") {
        return (
            <div className="flex mb-4" key={questionId}>
                <div className="flex justify-center overflow-x-auto flex-1">
                    <Image
                        src={content}
                        width={400}
                        height={400}
                        className="w-[500px]"
                        alt="Image"
                    />
                </div>

                {mode !== formMode.readonly && mode !== formMode.respond && (
                    <div className="flex items-center basis-[110px] grow-0 shrink-0 ml-1">
                        {renderButtons()}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex mb-2" key={questionId}>
            <div className="flex-1 overflow-x-hidden">
                <RichTextInput
                    formId={formId}
                    placeholder={"Add text"}
                    placeholderClassName={"pl-4 translate-y-2"}
                    className={`rounded-md border-foreground focus:border-primary caret-primary transition-colors duration-200 ease-in-out w-full ${
                        mode !== formMode.readonly && mode !== formMode.respond
                            ? "border-[1px] "
                            : "border-0"
                    }`}
                    blockId={blockId}
                    questionId={questionId}
                    value={content}
                    action={updateQuestionFieldByBlockIdQuestionFieldId}
                />
            </div>
            {mode !== formMode.readonly && mode !== formMode.respond && (
                <div className="translate-y-[5px] basis-[110px] grow-0 shrink-0 ml-1">
                    {renderButtons()}
                </div>
            )}
        </div>
    );
};

export default QuestionField;
