/* eslint-disable react/prop-types */

import FormButton from "./FormButton";
import {
    deleteBlockByBlockId,
    insertDuplicateBlockUnderBlockWithBlockId,
    insertNewBlockUnderBlockWithBlockId,
} from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";

/* eslint-disable react/react-in-jsx-scope */
const FormBlock = ({
    children,
    className,
    displayMenu = false,
    blockId,
    activeBlock,
    setActiveBlock,
}) => {
    const isActive = () => {
        return activeBlock === blockId;
    };
    const { id } = useParams();

    return (
        <div
            onFocus={() => setActiveBlock(blockId)}
            onBlur={() => setActiveBlock(null)}
            onClick={() => setActiveBlock(blockId)}
            className={`px-6 pt-1 border-l-[2px] focus-within:border-primary ${className} ${
                isActive()
                    ? "border-primary"
                    : "border-slate-400 dark:border-gray-700"
            }`}
        >
            {children}
            {displayMenu && (
                <div
                    className={`text-center mt-4 transition-height overflow-hidden duration-[300ms] ease-in-out ${
                        !isActive() ? "max-h-0" : "max-h-[100px]"
                    }`}
                >
                    <div className="border-b-[1px] border-slate-400">
                        <FormButton
                            formId={id}
                            blockId={blockId}
                            action={insertNewBlockUnderBlockWithBlockId}
                            className="w-1/3 hover:bg-slate-200 hover:text-primary dark:hover:bg-gray-800 py-1 text-sm"
                            type="button"
                        >
                            Add New Question
                        </FormButton>
                        <FormButton
                            formId={id}
                            action={insertDuplicateBlockUnderBlockWithBlockId}
                            blockId={blockId}
                            className="w-1/3 hover:bg-slate-200 hover:text-primary dark:hover:bg-gray-800 py-1 text-sm"
                            type="button"
                        >
                            Duplicate
                        </FormButton>
                        <FormButton
                            formId={id}
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
