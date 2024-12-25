/* eslint-disable react/prop-types */

import { useState } from "react";
import FormButton from "./FormButton";
import {
    deleteBlockByBlockId,
    insertDuplicateBlockUnderBlockWithBlockId,
    insertNewBlockUnderBlockWithBlockId,
} from "@/lib/features/form/formSlice";

/* eslint-disable react/react-in-jsx-scope */
const FormBlock = ({ children, className, displayMenu = false, blockId }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onClick={() => setIsFocused(true)}
            className={`px-6 pt-1 border-l-[2px] border-background focus-within:border-primary ${className} ${
                isFocused && "border-primary"
            }`}
        >
            {children}
            {displayMenu && (
                <div
                    className={`text-center mt-4 transition-height overflow-hidden duration-[300ms] ease-in-out ${
                        !isFocused ? "max-h-0" : "max-h-[100px]"
                    }`}
                >
                    <div className="border-b-[1px] border-slate-400">
                        <FormButton
                            blockId={blockId}
                            action={insertNewBlockUnderBlockWithBlockId}
                            className="w-1/3 hover:bg-slate-200 hover:text-primary dark:hover:bg-gray-800 py-1 text-sm"
                            type="button"
                        >
                            Add New Question
                        </FormButton>
                        <FormButton
                            action={insertDuplicateBlockUnderBlockWithBlockId}
                            blockId={blockId}
                            className="w-1/3 hover:bg-slate-200 hover:text-primary dark:hover:bg-gray-800 py-1 text-sm"
                            type="button"
                        >
                            Duplicate
                        </FormButton>
                        <FormButton
                            action={deleteBlockByBlockId}
                            blockId={blockId}
                            className="w-1/3 hover:bg-slate-200 hover:text-primary dark:hover:bg-gray-800 py-1 text-sm"
                            type="button"
                        >
                            Delete Question
                        </FormButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormBlock;