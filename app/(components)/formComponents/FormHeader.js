/* eslint-disable react/react-in-jsx-scope */

import { useDispatch, useSelector } from "react-redux";
import MarkdownInput from "../MarkdownInput";
import {
    selectFormDescription,
    selectFormTitle,
    updateFormDescription,
    updateFormTitle,
} from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";

const FormHeader = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const formTitle = useSelector((state) => selectFormTitle(state, id));
    const formDescription = useSelector((state) =>
        selectFormDescription(state, id)
    );

    return (
        <div>
            <input
                name={"title"}
                type={"text"}
                placeholder={"Form Title"}
                className={`border-0 border-b-[2px] caret-primary focus:border-primary bg-background w-full leading-10 pl-4 mb-4 focus:outline-none focus:ring-0 font-bold text-xl transition-colors duration-200 ease-in-out`}
                value={formTitle}
                onChange={(e) =>
                    dispatch(updateFormTitle({ title: e.target.value, id: id }))
                }
            />
            <MarkdownInput
                placeholder={"Form Description"}
                className={
                    "border-0 border-b-[2px] transition-colors duration-200 ease-in-out caret-primary"
                }
                formId={id}
                value={formDescription}
                action={updateFormDescription}
            />
        </div>
    );
};

export default FormHeader;
