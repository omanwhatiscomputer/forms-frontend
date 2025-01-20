/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { formMode } from "@/constants/formMode";
import { selectFormMode } from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";
import { MdOutlineDragIndicator } from "react-icons/md";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const FormBlockReorderIcon = ({ dragControls, className, idx }) => {
    const { id } = useParams();
    const mode = useSelector((state) => selectFormMode(state, id));
    return (
        <div
            className={`flex items-center select-none py-1 ${className} ${
                dragControls && "cursor-move"
            }`}
            {...(dragControls && {
                onPointerDown: (event) => dragControls.start(event),
            })}
            // onPointerDown={(event) => dragControls.start(event)}
        >
            {mode &&
            (mode === formMode.readonly || mode === formMode.respond) ? (
                <IoCaretForwardOutline className="text-xl text-gray-300 dark:text-background" />
            ) : (
                <MdOutlineDragIndicator className="text-xl text-gray-300 dark:text-background" />
            )}

            <p className="font-bold text-gray-200 pl-3">Question #{idx + 1}</p>
        </div>
    );
};

export default FormBlockReorderIcon;
