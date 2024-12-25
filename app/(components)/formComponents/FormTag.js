/* eslint-disable react/react-in-jsx-scope */

import FormTagAddNew from "./FormTagComponents/FormTagAddNew";
import FormTagBadge from "./FormTagComponents/FormTagBadge";

const FormTag = () => {
    return (
        <div className="flex flex-col mt-4">
            <div className="flex justify-between mb-4 font-bold text-lg">
                <p>Tags</p>
                <FormTagAddNew />
            </div>
            <div className="flex flex-wrap pl-4">
                <FormTagBadge tagName={"Default"} />
            </div>
        </div>
    );
};

export default FormTag;
