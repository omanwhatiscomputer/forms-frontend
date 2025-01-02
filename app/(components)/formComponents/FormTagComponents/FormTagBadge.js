/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";
import { formMode } from "@/constants/formMode";
import {
    removeUserTagFromForm,
    selectFormMode,
} from "@/lib/features/form/formSlice";
import { Badge } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const FormTagBadge = ({ tagName, formId }) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => selectFormMode(state, formId));
    const handleTagRemoveButtonClick = () => {
        dispatch(removeUserTagFromForm({ id: formId, tagName: tagName }));
    };
    return (
        <Badge className="mr-2" color="gray">
            <div className="flex items-center p-1">
                {tagName}

                {mode !== formMode.readonly && mode !== formMode.respond && (
                    <button
                        onClick={() => handleTagRemoveButtonClick()}
                        title="Remove tag"
                        className="hover:text-primary text-base translate-x-[6px]"
                    >
                        <IoClose />
                    </button>
                )}
            </div>
        </Badge>
    );
};

export default FormTagBadge;
