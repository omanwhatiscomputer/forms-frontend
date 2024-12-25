import { updateFormBannerUrl } from "@/lib/features/form/formSlice";
import FormButton from "./FormButton";
import FormAccessControl from "./FormMenuComponents/FormAccessControl";
import FormTopic from "./FormMenuComponents/FormTopic";

/* eslint-disable react/react-in-jsx-scope */
const FormMenu = () => {
    return (
        <div>
            <FormTopic className={"text-sm"} />
            <FormButton
                type={"button"}
                className={"text-sm"}
                forImageUpload={true}
                title="Upload New Banner Image"
                action={updateFormBannerUrl}
            >
                Change Banner
            </FormButton>
            <FormAccessControl className={"text-sm"} />
            <FormButton type={"button"} className={"text-sm"}>
                Save
            </FormButton>
        </div>
    );
};

export default FormMenu;
