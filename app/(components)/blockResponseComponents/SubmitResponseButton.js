/* eslint-disable react/react-in-jsx-scope */
"use client";

import { responseMode } from "@/constants/responseMode";
import {
    selectFormResponseObject,
    selectResponseMode,
    submitResponse,
    updateResponse,
} from "@/lib/features/form/responseSlice";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const SubmitResponseButton = () => {
    const { responseId } = useParams();
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const formResponse = useSelector((state) =>
        selectFormResponseObject(state, responseId)
    );
    const mode = useSelector((state) => selectResponseMode(state, responseId));
    const handleSubmit = () => {
        if (mode === responseMode.create) {
            dispatch(submitResponse({ responseObject: formResponse, theme }));
        } else if (mode === responseMode.update) {
            dispatch(updateResponse({ responseObject: formResponse, theme }));
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
