/* eslint-disable react/prop-types */

import BlockTextInput from "./BlockTextInput";
import FormButton from "../FormButton";

import { RiDeleteBin3Fill } from "react-icons/ri";
import Image from "next/image";
import CheckboxFieldImageToggleButton from "./CheckboxFieldImageToggleButton";
import {
    deleteCheckboxOptionByBlockIdCheckboxId,
    selectFormMode,
    updateCheckboxFieldIncludesImageByBlockIdCheckboxId,
} from "@/lib/features/form/formSlice";
import { useSelector } from "react-redux";
import { formMode } from "@/constants/formMode";

/* eslint-disable react/react-in-jsx-scope */
const CheckboxField = ({
    blockId,
    checkboxId,
    content,
    includesImage = false,
    imageUrl,
    action,
    formId,
}) => {
    const mode = useSelector((state) => selectFormMode(state, formId));
    return (
        <div className="my-2 flex flex-col flex-1">
            <div className="my-2 flex">
                <div className="flex flex-1">
                    <input
                        type="checkbox"
                        disabled
                        className="translate-y-[8px]"
                    />
                    <BlockTextInput
                        name={checkboxId + "-checkbox"}
                        formId={formId}
                        blockId={blockId}
                        checkboxId={checkboxId}
                        action={action}
                        value={content}
                        className={`ml-2 transition-colors duration-200 ease-in-out rounded-md ${
                            mode !== formMode.readonly
                                ? "border-foreground"
                                : "border-background"
                        }`}
                        placeholder={"Add text"}
                    />
                </div>

                {mode !== formMode.readonly && (
                    <div className="basis-[78px] grow-0 shrink-0 ml-1">
                        <CheckboxFieldImageToggleButton
                            formId={formId}
                            blockId={blockId}
                            checkboxId={checkboxId}
                            type="button"
                            includesImage={includesImage}
                            action={
                                updateCheckboxFieldIncludesImageByBlockIdCheckboxId
                            }
                            title="Upload Image"
                        />
                        <FormButton
                            formId={formId}
                            type={"button"}
                            blockId={blockId}
                            checkboxId={checkboxId}
                            action={deleteCheckboxOptionByBlockIdCheckboxId}
                            className="text-2xl text-foreground bg-slate-200 dark:bg-gray-900 p-1 rounded-sm hover:bg-slate-300 hover:dark:bg-gray-800 hover:text-primary ml-[7px]"
                        >
                            <RiDeleteBin3Fill />
                        </FormButton>
                    </div>
                )}
            </div>
            {includesImage && (
                <div className="flex justify-center my-4">
                    <Image
                        src={imageUrl}
                        width={400}
                        height={400}
                        className="w-[500px]"
                        alt="Image"
                    />
                </div>
            )}
        </div>
    );
};

export default CheckboxField;
