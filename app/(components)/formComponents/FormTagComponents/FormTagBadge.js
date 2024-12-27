/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";
import { removeUserTagFromForm } from "@/lib/features/form/formSlice";
import { Badge } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";

const FormTagBadge = ({ tagName, userTagId, formId }) => {
    const dispatch = useDispatch();

    const handleTagRemoveButtonClick = () => {
        dispatch(removeUserTagFromForm({ id: formId, tagName: tagName }));
    };
    return (
        <Badge className="mr-2" color="gray">
            <div className="flex items-center p-1">
                {tagName}
                <button
                    onClick={() => handleTagRemoveButtonClick()}
                    title="Remove tag"
                    className="hover:text-primary text-base translate-x-[6px]"
                >
                    <IoClose />
                </button>
            </div>
        </Badge>
    );
};

export default FormTagBadge;
