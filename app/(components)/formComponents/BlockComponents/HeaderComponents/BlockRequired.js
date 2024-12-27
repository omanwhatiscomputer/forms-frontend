/* eslint-disable react/prop-types */
// import { useState } from "react";

import {
    selectBlockRequiredByBlockId,
    updateBlockRequiredByBlockId,
} from "@/lib/features/form/formSlice";
import { useDispatch, useSelector } from "react-redux";

/* eslint-disable react/react-in-jsx-scope */
const BlockRequired = ({ blockId, formId }) => {
    // const [checked, setIsChecked] = useState(false);
    const dispatch = useDispatch();
    const isRequired = useSelector((state) =>
        selectBlockRequiredByBlockId(state, formId, blockId)
    );
    const handleChange = (e) => {
        dispatch(
            updateBlockRequiredByBlockId({
                id: formId,
                bId: blockId,
                value: e.target.checked,
            })
        );
    };
    return (
        <div className="p-2 translate-y-[2px] flex text-xs">
            <label
                htmlFor={`required-${blockId}`}
                className="flex  bg-gray-400 dark:bg-gray-600 cursor-pointer w-[26px] h-[13px] rounded-full"
            >
                <input
                    checked={isRequired}
                    type="checkbox"
                    id={`required-${blockId}`}
                    className="sr-only peer"
                    onChange={(e) => handleChange(e)}
                />
                <span className="w-[13px] h-[13px] bg-slate-200 dark:bg-gray-700 rounded-full -translate-y-[0.5px] peer-checked:translate-x-[13px] peer-checked:bg-primary transition-all duration-400" />
            </label>
            <span
                className="-translate-y-[2px] pl-1 cursor-default select-none"
                // onClick={() => setIsChecked((prev) => !prev)}
            >
                Required
            </span>
        </div>
    );
};

export default BlockRequired;
