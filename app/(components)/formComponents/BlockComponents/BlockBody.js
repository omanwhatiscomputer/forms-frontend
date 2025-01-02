"use client";
/* eslint-disable react/prop-types */

import SectionDivider from "../../common/SectionDivider";

import { RxText } from "react-icons/rx";
import { FiImage } from "react-icons/fi";

import FormButton from "../FormButton";

import { useDispatch, useSelector } from "react-redux";
import {
    addNewCheckboxOptionByBlockId,
    addNewQuestionFieldByBlockId,
    reorderCheckboxOptions,
    reorderQuestionGroup,
    selectBlockInputTypeByBlockId,
    selectCheckboxOptionsByBlockId,
    selectFormMode,
    selectQuestionGroupByBlockId,
    updateCheckboxFieldTextInputByBlockIdCheckboxFieldId,
} from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";

import { Reorder } from "framer-motion";
import CheckboxDnDItem from "./CheckboxDnDItem";
import QuestionDnDItem from "./QuestionDnDItem";
import { formMode } from "@/constants/formMode";
import QuestionField from "./QuestionField";
import CheckboxField from "./CheckboxField";

/* eslint-disable react/react-in-jsx-scope */
const BlockBody = ({ blockId }) => {
    const { id } = useParams();
    const mode = useSelector((state) => selectFormMode(state, id));

    const blockInputType = useSelector((state) =>
        selectBlockInputTypeByBlockId(state, id, blockId)
    );
    const blockQuestionGroup = useSelector((state) =>
        selectQuestionGroupByBlockId(state, id, blockId)
    );
    const blockCheckboxOptions = useSelector((state) =>
        selectCheckboxOptionsByBlockId(state, id, blockId)
    );
    const dispatch = useDispatch();

    return (
        <div className="pt-4">
            {mode !== formMode.readonly && mode !== formMode.respond && (
                <>
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
                </>
            )}
            {blockQuestionGroup.length > 0 ? (
                <div className="pt-4 mb-8">
                    {mode !== formMode.readonly && mode !== formMode.respond ? (
                        <Reorder.Group
                            axis="y"
                            onReorder={(val) =>
                                dispatch(
                                    reorderQuestionGroup({
                                        id: id,
                                        bId: blockId,
                                        bqg: val,
                                    })
                                )
                            }
                            values={blockQuestionGroup}
                        >
                            {blockQuestionGroup.map((bq) => (
                                <QuestionDnDItem
                                    key={bq.Id}
                                    bq={bq}
                                    formId={id}
                                    blockId={blockId}
                                />
                            ))}
                        </Reorder.Group>
                    ) : (
                        blockQuestionGroup.map((bqg) => (
                            <QuestionField
                                formId={id}
                                key={bqg.Id}
                                type={bqg.Type}
                                questionId={bqg.Id}
                                blockId={blockId}
                                content={bqg.Content}
                            />
                        ))
                    )}
                </div>
            ) : (
                mode !== formMode.readonly &&
                mode !== formMode.respond && (
                    <div className="flex justify-center items-center py-4">
                        No Question Fields
                    </div>
                )
            )}
            {blockInputType.includes("Checkbox") &&
                mode !== formMode.respond && (
                    <>
                        {mode !== formMode.readonly && (
                            <>
                                <SectionDivider
                                    content={"Multiple Choice Options"}
                                />
                                <div
                                    className="flex justify-end"
                                    key={`${blockId}-0`}
                                >
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
                            </>
                        )}
                        <div key={`${blockId}-1`}>
                            {mode !== formMode.readonly ? (
                                <Reorder.Group
                                    axis="y"
                                    onReorder={(val) =>
                                        dispatch(
                                            reorderCheckboxOptions({
                                                id: id,
                                                bId: blockId,
                                                cos: val,
                                            })
                                        )
                                    }
                                    values={blockCheckboxOptions}
                                >
                                    {blockCheckboxOptions.map((co) => (
                                        <CheckboxDnDItem
                                            key={co.Id}
                                            co={co}
                                            blockId={blockId}
                                            formId={id}
                                        />
                                    ))}
                                </Reorder.Group>
                            ) : (
                                blockCheckboxOptions.map((co) => (
                                    <CheckboxField
                                        formId={id}
                                        key={co.Id + blockId}
                                        includesImage={co.IncludesImage}
                                        content={co.Content}
                                        imageUrl={co.ImageUrl}
                                        blockId={blockId}
                                        checkboxId={co.Id}
                                        action={
                                            updateCheckboxFieldTextInputByBlockIdCheckboxFieldId
                                        }
                                    />
                                ))
                            )}
                        </div>
                    </>
                )}
        </div>
    );
};

export default BlockBody;
