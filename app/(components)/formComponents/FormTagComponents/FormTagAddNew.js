/* eslint-disable react/react-in-jsx-scope */
import { selectFormId } from "@/lib/features/form/formSlice";
import { selectUserId } from "@/lib/features/general/authSlice";
import { registerNewUserTag } from "@/lib/features/general/userSlice";
import { Popover } from "flowbite-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

const FormTagAddNew = () => {
    const { theme } = useTheme();
    const [newTag, setNewTag] = useState("");
    const dispatch = useDispatch();

    const handleAddButtonClick = () => {
        dispatch(
            registerNewUserTag({
                UserId: useSelector(selectUserId),
                TagName: newTag,
                FormTemplateId: useSelector(selectFormId),
                theme: theme,
            })
        );
    };
    return (
        <Popover
            aria-labelledby="default-popover"
            placement="left"
            content={
                <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3
                            id="default-popover"
                            className="font-semibold text-gray-900 dark:text-white"
                        >
                            Add new tag
                        </h3>
                    </div>
                    <div className="px-3 py-2 dark:bg-background flex justify-around">
                        <input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            type="text"
                            className="bg-background text-foreground focus:ring-0 outline-none focus:border-primary text-sm rounded-lg"
                            placeholder="Enter tag name"
                        />
                        <button
                            onClick={() => handleAddButtonClick()}
                            className="hover:text-primary hover:bg-slate-300 dark:hover:bg-gray-800 rounded-lg px-2 ml-1"
                        >
                            Add
                        </button>
                    </div>
                </div>
            }
        >
            <button
                type="button"
                className="hover:text-primary"
                title="Add Tag"
            >
                <TiPlus />
            </button>
        </Popover>
    );
};

export default FormTagAddNew;
