/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import SectionDivider from "./common/SectionDivider";
import { useDispatch, useSelector } from "react-redux";
import {
    selectBlockResponseValidationByFormResponseIdBlockId,
    selectResponseMode,
    toggleValidationErrorByBlockId,
    updateBlockResponseAnswerByBlockId,
} from "@/lib/features/form/responseSlice";
import TextArea from "./blockResponseComponents/TextArea";
import TextField from "./blockResponseComponents/TextField";
import CheckboxSingle from "./blockResponseComponents/CheckboxSingle";
import CheckboxMultiple from "./blockResponseComponents/CheckboxMultiple";
import { responseMode } from "@/constants/responseMode";

/* eslint-disable react/react-in-jsx-scope */
const BlockResponse = ({
    blockId,
    responseId,
    formResponseBlocks,
    blockType,
    checkboxOptions,
}) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => selectResponseMode(state, responseId));
    const respBlock = formResponseBlocks
        ? formResponseBlocks.find((frb) => frb.BlockId === blockId)
        : {};
    const blockResponseValidationObject = useSelector((state) =>
        selectBlockResponseValidationByFormResponseIdBlockId(
            state,
            responseId,
            blockId
        )
    );

    const initializeAnswer = () => {
        if (mode === responseMode.create) {
            return blockType.includes("Multiple") ? [] : "";
        } else if (
            mode === responseMode.readonly ||
            mode === responseMode.update
        ) {
            return blockType.includes("Checkbox")
                ? JSON.parse(respBlock.Content)
                : respBlock.Content;
        }
    };
    const [value, setValue] = useState(initializeAnswer());

    const handleSingleAnswerCheckBox = (e) => {
        value.length === 0 &&
            dispatch(
                toggleValidationErrorByBlockId({
                    id: responseId,
                    blockId: blockId,
                    value: false,
                })
            );
        setValue(e.target.checked ? e.target.value : "");
    };
    const handleMultipleAnswersCheckBox = (e) => {
        dispatch(
            toggleValidationErrorByBlockId({
                id: responseId,
                blockId: blockId,
                value: false,
            })
        );
        setValue((prev) => {
            const newVal = [...prev];
            if (prev.includes(e.target.value)) {
                newVal.splice(prev.indexOf(e.target.value), 1);
                return newVal;
            } else {
                newVal.push(e.target.value);
                return newVal;
            }
        });
    };
    const handleTextInput = (e) => {
        e.target.value.length > 0 &&
            dispatch(
                toggleValidationErrorByBlockId({
                    id: responseId,
                    blockId: blockId,
                    value: false,
                })
            );
        setValue(e.target.value);
    };

    useEffect(() => {
        if (
            respBlock &&
            Object.keys(respBlock).length !== 0 &&
            (mode === responseMode.update || mode === responseMode.readonly)
        ) {
            setValue(JSON.parse(respBlock.Content));
        }
    }, [respBlock]);
    useEffect(() => {
        if (respBlock) {
            dispatch(
                updateBlockResponseAnswerByBlockId({
                    id: responseId,
                    blockId: blockId,
                    value: value,
                })
            );
        }
    }, [value]);
    const renderInputField = () => {
        switch (blockType) {
            case "Single-line":
                return (
                    <TextArea
                        {...(respBlock && { isRequired: respBlock.IsRequired })}
                        value={value}
                        handleChange={handleTextInput}
                        mode={mode}
                    />
                );
            case "Multi-line":
                return (
                    <TextField
                        {...(respBlock && { isRequired: respBlock.IsRequired })}
                        value={value}
                        handleChange={handleTextInput}
                        mode={mode}
                    />
                );
            case "Integer":
                return (
                    <TextField
                        {...(respBlock && { isRequired: respBlock.IsRequired })}
                        value={value}
                        handleChange={handleTextInput}
                        mode={mode}
                    />
                );
            case "Checkbox (Single Answer)":
                return (
                    <CheckboxSingle
                        {...(respBlock && { isRequired: respBlock.IsRequired })}
                        mode={mode}
                        value={value}
                        handleChange={handleSingleAnswerCheckBox}
                        checkboxOptions={checkboxOptions}
                    />
                );
            case "Checkbox (Multiple Answers)":
                return (
                    <CheckboxMultiple
                        {...(respBlock && { isRequired: respBlock.IsRequired })}
                        mode={mode}
                        value={value}
                        handleChange={handleMultipleAnswersCheckBox}
                        checkboxOptions={checkboxOptions}
                    />
                );

            default:
                return <div></div>;
        }
    };
    return (
        <div>
            <SectionDivider content={"Your Answer:"} />
            {renderInputField()}
            {blockResponseValidationObject.ShowError &&
                blockResponseValidationObject.Errors.length > 0 && (
                    <div className="pl-4 p-2 opacity-50 font-semibold bg-primary text-white w-full">
                        {blockResponseValidationObject.Errors[0]}
                    </div>
                )}
        </div>
    );
};

export default BlockResponse;

/**
 *  "Single-line",
    "Multi-line",
    "Integer",
    "Checkbox (Single Answer)",
    "Checkbox (Multiple Answers)",
 */
