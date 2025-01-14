/* eslint-disable react/react-in-jsx-scope */

import { useDispatch, useSelector } from "react-redux";
import MarkdownInput from "../MarkdownInput";
import {
    selectForm,
    selectFormDescription,
    selectFormMode,
    selectFormTitle,
    updateFormDescription,
    updateFormTitle,
} from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";
import { formMode } from "@/constants/formMode";

const FormHeader = () => {
    const { id } = useParams();
    const mode = useSelector((state) => selectFormMode(state, id));
    const dispatch = useDispatch();
    const formTitle = useSelector((state) => selectFormTitle(state, id));
    const formDescription = useSelector((state) =>
        selectFormDescription(state, id)
    );
    const form = useSelector((state) => selectForm(state, id));

    return (
        <div className="mt-8">
            <input
                {...((mode === formMode.readonly ||
                    mode === formMode.respond) && { disabled: true })}
                name={"title"}
                type={"text"}
                placeholder={"Form Title"}
                className={`border-0 border-b-[2px] caret-primary focus:border-primary bg-background w-full leading-10 pl-4 mb-4 focus:outline-none focus:ring-0 font-bold text-xl transition-colors duration-200 ease-in-out`}
                value={formTitle}
                onChange={(e) =>
                    dispatch(updateFormTitle({ title: e.target.value, id: id }))
                }
            />

            {Object.keys(form).length > 0 && (
                <MarkdownInput
                    placeholder={"Form Description"}
                    className={`transition-colors duration-200 ease-in-out caret-primary ${
                        mode === formMode.readonly || mode === formMode.respond
                            ? "border-0"
                            : "border-0 border-b-[2px]"
                    }`}
                    formId={id}
                    value={formDescription}
                    action={updateFormDescription}
                />
            )}
        </div>
    );
};

export default FormHeader;
