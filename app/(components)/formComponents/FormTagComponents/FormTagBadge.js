/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Badge } from "flowbite-react";
import { IoClose } from "react-icons/io5";

const FormTagBadge = ({ tagName, userTagId }) => {
    const handleTagRemoveButtonClick = () => {};
    return (
        <Badge color="gray">
            <div className="flex items-center p-1">
                {tagName}
                <button
                    title="Delete tag"
                    className="hover:text-primary text-base translate-x-[6px]"
                >
                    <IoClose />
                </button>
            </div>
        </Badge>
    );
};

export default FormTagBadge;
