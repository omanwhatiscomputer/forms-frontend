import {
    saveForm,
    selectForm,
    updateFormBannerUrl,
} from "@/lib/features/form/formSlice";
import FormButton from "./FormButton";
import FormAccessControl from "./FormMenuComponents/FormAccessControl";
import FormTopic from "./FormMenuComponents/FormTopic";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { formMode } from "@/constants/formMode";
import SubmitResponseButton from "../blockResponseComponents/SubmitResponseButton";

/* eslint-disable react/react-in-jsx-scope */
const FormMenu = () => {
    const { id } = useParams();
    const form = useSelector((state) => selectForm(state, id));
    if (form.mode === formMode.readonly) {
        return (
            <div className="flex justify-end items-center px-2 md:px-4 lg:px-20 xl:px-52 py-1 border-b-[1px] border-slate-400 dark:border-gray-600"></div>
        );
    }

    if (form.mode === formMode.respond) {
        return (
            <div className="flex justify-end items-center px-2 md:px-4 lg:px-20 xl:px-52 py-1 border-b-[1px] border-slate-400 dark:border-gray-600">
                <SubmitResponseButton />
            </div>
        );
    }

    return (
        <div className="fixed w-full top-[37px] z-20 bg-background flex items-center justify-between px-2 md:px-4 lg:px-20 xl:px-52 py-1 border-b-[1px] border-slate-400 dark:border-gray-600">
            <div className="flex">
                <FormTopic className={"text-xs"} />
                <FormButton
                    type={"button"}
                    className={
                        "text-xs px-2 hover:bg-slate-300 dark:hover:bg-gray-800 leading-3 hover:text-primary"
                    }
                    forImageUpload={true}
                    title="Upload New Banner Image"
                    action={updateFormBannerUrl}
                    formId={id}
                >
                    Change
                    <br />
                    Banner
                </FormButton>
            </div>
            <div className="flex">
                <FormAccessControl formId={id} />
                <FormButton
                    form={form}
                    type={"button"}
                    className={
                        "text-sm px-2 dark:hover:bg-gray-800 hover:text-primary"
                    }
                    action={saveForm}
                    formId={id}
                >
                    Save
                </FormButton>
            </div>
        </div>
    );
};

export default FormMenu;
