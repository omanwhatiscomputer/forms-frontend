/* eslint-disable react/react-in-jsx-scope */
"use client";

import { responseMode } from "@/constants/responseMode";
import {
    selectFormResponseObject,
    selectFormResponseValidationObjectbyFormResponseId,
    selectResponseMode,
    submitResponse,
    toggleValidationErrorForAllBlocks,
    updateResponse,
} from "@/lib/features/form/responseSlice";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { emitMessage } from "../NotificationToaster";
import { useRouter } from "next/navigation";

const SubmitResponseButton = () => {
    const router = useRouter();
    const { responseId } = useParams();
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const formResponse = useSelector((state) =>
        selectFormResponseObject(state, responseId)
    );
    const formResponseValidationObject = useSelector((state) =>
        selectFormResponseValidationObjectbyFormResponseId(state, responseId)
    );
    const mode = useSelector((state) => selectResponseMode(state, responseId));
    const handleSubmit = () => {
        // TODO: validate form inputs

        const numErrors =
            formResponseValidationObject.BlockResponseValidationObjects.map(
                (brvo) => brvo.Errors.length
            ).reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            );
        if (numErrors > 0) {
            dispatch(
                toggleValidationErrorForAllBlocks({
                    id: responseId,
                    value: true,
                })
            );
            emitMessage(
                `Error(s) detected in ${numErrors} input field(s). Please check your responses and try again.`,
                "error"
            );
            return;
        }

        // submit or update
        if (mode === responseMode.create) {
            dispatch(
                submitResponse({ responseObject: formResponse, theme, router })
            );
        } else if (mode === responseMode.update) {
            dispatch(
                updateResponse({ responseObject: formResponse, theme, router })
            );
        }
    };
    return (
        <button
            onClick={() => handleSubmit()}
            type="button"
            className="text-sm px-2 dark:hover:bg-gray-800 hover:text-primary"
        >
            {mode === responseMode.create ? "Submit" : "Update"}
        </button>
    );
};

export default SubmitResponseButton;
