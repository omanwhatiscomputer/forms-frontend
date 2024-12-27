/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";
import { selectFormTags } from "@/lib/features/form/formSlice";
import FormTagAddNew from "./FormTagComponents/FormTagAddNew";
import FormTagBadge from "./FormTagComponents/FormTagBadge";
import { useSelector } from "react-redux";

const FormTag = ({ formId }) => {
    const formTags = useSelector((state) => selectFormTags(state, formId));
    return (
        <div className="flex flex-col mt-4">
            <div className="flex justify-between mb-4 font-bold text-lg">
                <p className="cursor-default select-none">Tags</p>
                <FormTagAddNew />
            </div>
            <div className="flex flex-wrap pl-4">
                {formTags.length > 0 &&
                    formTags.map((ft) => (
                        <FormTagBadge
                            key={ft.UserTagId}
                            userTagId={ft.UserTagId}
                            formId={formId}
                            tagName={ft.TagName}
                        />
                    ))}
            </div>
        </div>
    );
};

export default FormTag;
