/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import RichTextInput from "../../RichTextInput";
import BlockTextInput from "./BlockTextInput";
import BlockInputType from "./HeaderComponents/BlockInputType";
import BlockRequired from "./HeaderComponents/BlockRequired";
import {
    selectBlockDescriptionByBlockId,
    selectBlockTitleByBlockId,
    selectFormMode,
    updateBlockDescriptionByBlockId,
    updateBlockTitleByBlockId,
} from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";
import { formMode } from "@/constants/formMode";

/* eslint-disable react/react-in-jsx-scope */
const BlockHeader = ({ blockId }) => {
    const { id } = useParams();
    const blockTitle = useSelector((state) =>
        selectBlockTitleByBlockId(state, id, blockId)
    );
    const blockDescription = useSelector((state) =>
        selectBlockDescriptionByBlockId(state, id, blockId)
    );
    const mode = useSelector((state) => selectFormMode(state, id));

    return (
        <div className="border-t-[1px] border-t-slate-300 dark:border-t-gray-600 pt-2">
            {mode !== formMode.readonly && mode !== formMode.respond && (
                <div className={`flex justify-between pb-4`}>
                    <BlockInputType
                        name={"inputType"}
                        blockId={blockId}
                        formId={id}
                    />
                    <BlockRequired blockId={blockId} formId={id} />
                </div>
            )}
            <BlockTextInput
                formId={id}
                name="title"
                type="text"
                placeholder={"Question title"}
                value={blockTitle}
                action={updateBlockTitleByBlockId}
                blockId={blockId}
                className={
                    "font-semibold transition-colors duration-200 ease-in-out"
                }
            />
            <RichTextInput
                formId={id}
                className={`focus:border-primary transition-colors duration-200 ease-in-out border-foreground caret-primary ${
                    mode !== formMode.readonly && mode !== formMode.respond
                        ? "border-0 border-b-[2px]"
                        : "border-0"
                }`}
                placeholder={"Question Description"}
                placeholderClassName={"translate-y-[10px] pl-4"}
                action={updateBlockDescriptionByBlockId}
                value={blockDescription}
                blockId={blockId}
            />
        </div>
    );
};

export default BlockHeader;
