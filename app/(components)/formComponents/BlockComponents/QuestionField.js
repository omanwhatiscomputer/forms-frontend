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
    updateQuestionFieldByBlockIdQuestionFieldId,
} from "@/lib/features/form/formSlice";

const QuestionField = ({ type, content, blockId, questionId }) => {
    const renderButtons = () => {
        return (
            <>
                <FormButton
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
            <div className="flex my-4" key={questionId}>
                <div className="flex justify-center overflow-x-auto flex-1">
                    <Image
                        src={content}
                        width={400}
                        height={400}
                        className="w-[500px]"
                        alt="Image"
                    />
                </div>
                <div className="flex items-center basis-[110px] grow-0 shrink-0 ml-1">
                    {renderButtons()}
                </div>
            </div>
        );
    }

    return (
        <div className="flex mb-2" key={questionId}>
            <div className="flex-1 overflow-x-hidden">
                <RichTextInput
                    placeholder={"Add text"}
                    placeholderClassName={"pl-4 translate-y-2"}
                    className={
                        "border-[1px] rounded-md border-foreground focus:border-primary caret-primary transition-colors duration-200 ease-in-out w-full"
                    }
                    blockId={blockId}
                    questionId={questionId}
                    value={content}
                    action={updateQuestionFieldByBlockIdQuestionFieldId}
                />
            </div>
            <div className="translate-y-[5px] basis-[110px] grow-0 shrink-0 ml-1">
                {renderButtons()}
            </div>
        </div>
    );
};

export default QuestionField;
