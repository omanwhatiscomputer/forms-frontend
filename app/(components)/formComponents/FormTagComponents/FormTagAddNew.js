/* eslint-disable react/react-in-jsx-scope */

import { formMode } from "@/constants/formMode";
import { maxNumberOfSuggestions } from "@/constants/misc";
import {
    addExistingUserTagToForm,
    selectFormMode,
    selectFormTags,
} from "@/lib/features/form/formSlice";
import { selectUserId } from "@/lib/features/general/authSlice";
import {
    registerNewUserTag,
    selectUserTags,
} from "@/lib/features/general/userSlice";
import { Popover } from "flowbite-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const FormTagAddNew = () => {
    const { id } = useParams();
    const mode = useSelector((state) => selectFormMode(state, id));
    const formTags = useSelector((state) => selectFormTags(state, id));
    const userTags = useSelector((state) => selectUserTags(state));
    const { theme } = useTheme();
    const [newTag, setNewTag] = useState("");
    const [focused, setFocused] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);

    const getFilteredUserTags = () => {
        let filteredTags = userTags.filter((ut) =>
            ut.tagName.toLowerCase().includes(newTag.toLowerCase())
        );
        filteredTags = filteredTags.filter(
            (t) => !formTags.find((ft) => ft.TagName === t.tagName)
        );
        return filteredTags.slice(0, maxNumberOfSuggestions);
    };
    const handleSuggestionClick = async (tagName) => {
        const ft = formTags.find((t) => t.TagName === tagName);
        if (ft) return;

        const ut = userTags.find((t) => t.tagName === tagName);

        if (ut) {
            await dispatch(
                addExistingUserTagToForm({
                    tag: {
                        FormTemplateId: id,
                        AuthorId: userId,
                        TagName: ut.tagName,
                        UserTagId: ut.id,
                    },
                })
            );
        }
        setFocused(false);
    };

    const handleAddButtonClick = async () => {
        const ft = formTags.find((t) => t.TagName === newTag);
        if (ft) return;

        const tagExists = userTags.find((t) => t.tagName === newTag);
        if (tagExists) {
            await dispatch(
                addExistingUserTagToForm({
                    tag: {
                        FormTemplateId: id,
                        AuthorId: userId,
                        TagName: tagExists.tagName,
                        UserTagId: tagExists.id,
                    },
                })
            );
        } else {
            await dispatch(
                registerNewUserTag({
                    UserId: userId,
                    TagName: newTag,
                    FormTemplateId: id,
                    theme: theme,
                })
            );
        }
        setNewTag("");
    };

    if (mode === formMode.readonly || mode === formMode.respond) {
        return <div> </div>;
    }

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
                        <div>
                            <input
                                value={newTag}
                                onFocus={() => setFocused(true)}
                                // onBlur={() => setFocused(false)}
                                onChange={(e) => setNewTag(e.target.value)}
                                type="text"
                                className="bg-background text-foreground focus:ring-0 outline-none focus:border-primary text-sm rounded-lg"
                                placeholder="Enter tag name"
                            />
                            {focused && userTags.length > 0 && (
                                <div className="absolute w-[195px] rounded-md border-[1px] border-slate-400 dark:border-gray-700">
                                    <div className="bg-background  px-1 flex flex-col items-center justify-center">
                                        {getFilteredUserTags().map((ut) => (
                                            <button
                                                onFocus={() => setFocused(true)}
                                                onBlur={() => setFocused(false)}
                                                key={ut.id}
                                                type="button"
                                                className="pl-4 w-full hover:bg-primary hover:text-white text-start"
                                                onClick={() =>
                                                    handleSuggestionClick(
                                                        ut.tagName
                                                    )
                                                }
                                            >
                                                {ut.tagName}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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
