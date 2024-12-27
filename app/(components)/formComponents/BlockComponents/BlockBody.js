"use client";
/* eslint-disable react/prop-types */

import SectionDivider from "../../common/SectionDivider";

import { RxText } from "react-icons/rx";
import { FiImage } from "react-icons/fi";

import FormButton from "../FormButton";
import QuestionField from "./QuestionField";
import CheckboxField from "./CheckboxField";
import { useSelector } from "react-redux";
import {
    addNewCheckboxOptionByBlockId,
    addNewQuestionFieldByBlockId,
    selectBlockInputTypeByBlockId,
    selectCheckboxOptionsByBlockId,
    selectQuestionGroupByBlockId,
    updateCheckboxFieldTextInputByBlockIdCheckboxFieldId,
} from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";

/* eslint-disable react/react-in-jsx-scope */
const BlockBody = ({ blockId }) => {
    const { id } = useParams();

    const blockInputType = useSelector((state) =>
        selectBlockInputTypeByBlockId(state, id, blockId)
    );
    const blockQuestionGroup = useSelector((state) =>
        selectQuestionGroupByBlockId(state, id, blockId)
    );
    const blockCheckboxOptions = useSelector((state) =>
        selectCheckboxOptionsByBlockId(state, id, blockId)
    );
    return (
        <div className="pt-4">
            <SectionDivider content={"Additional Fields"} />
            <div className="flex justify-end items-center">
                <div className="flex justify-between w-[110px] items-center">
                    <p className="text-xs text-slate-500 dark:text-gray-600 font-bold select-none cursor-default">
                        ADD:
                    </p>
                    <FormButton
                        formId={id}
                        action={addNewQuestionFieldByBlockId}
                        blockId={blockId}
                        type={"button"}
                        className="text-2xl text-foreground bg-slate-200 dark:bg-gray-900 p-1 rounded-sm hover:bg-slate-300 hover:dark:bg-gray-800 hover:text-primary"
                    >
                        <RxText />
                    </FormButton>
                    <FormButton
                        formId={id}
                        action={addNewQuestionFieldByBlockId}
                        forImageUpload={true}
                        type={"button"}
                        blockId={blockId}
                        className="text-2xl text-foreground bg-slate-200 dark:bg-gray-900 p-1 rounded-sm hover:bg-slate-300 hover:dark:bg-gray-800 hover:text-primary"
                    >
                        <FiImage />
                    </FormButton>
                </div>
            </div>
            {blockQuestionGroup.length > 0 ? (
                <div className="pt-4 mb-8">
                    {blockQuestionGroup.map((bqg) => (
                        <QuestionField
                            formId={id}
                            key={bqg.Id}
                            type={bqg.Type}
                            questionId={bqg.Id}
                            blockId={blockId}
                            content={bqg.Content}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center py-4">
                    No Question Fields
                </div>
            )}
            {blockInputType.includes("Checkbox") && (
                <>
                    <SectionDivider content={"Multiple Choice Options"} />
                    <div className="flex justify-end" key={`${blockId}-0`}>
                        <FormButton
                            formId={id}
                            blockId={blockId}
                            action={addNewCheckboxOptionByBlockId}
                            type={"button"}
                            className="text-sm text-foreground bg-slate-200 dark:bg-gray-900 p-1 rounded-sm hover:bg-slate-300 hover:dark:bg-gray-800 hover:text-primary"
                        >
                            Add Option
                        </FormButton>
                    </div>
                    <div key={`${blockId}-1`}>
                        {blockCheckboxOptions.map((co) => (
                            <CheckboxField
                                formId={id}
                                key={co.Id + blockId}
                                includesImage={co.IncludesImage}
                                content={co.content}
                                imageUrl={co.ImageUrl}
                                blockId={blockId}
                                checkboxId={co.Id}
                                action={
                                    updateCheckboxFieldTextInputByBlockIdCheckboxFieldId
                                }
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BlockBody;
