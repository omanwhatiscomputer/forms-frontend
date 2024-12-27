/* eslint-disable react/prop-types */
"use client";

import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";

import { Toolbar } from "./slatejs/richtext/common";
import {
    BlockButton,
    Element,
    Leaf,
    MarkButton,
    toggleMark,
} from "./slatejs/richtext/editor";
import { HOTKEYS } from "./slatejs/richtext/constants";
import CustomPlaceholder from "./slatejs/CustomPlaceholder";
import { useDispatch } from "react-redux";
import { richtextDefault } from "@/constants/defaultValue";

const RichTextInput = ({
    className,
    placeholder,
    placeholderClassName,
    action,
    value,
    blockId,
    questionId,
    formId,
}) => {
    const dispatch = useDispatch();
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    // const [value, setValue] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);

    // const handleValueChange = (v) => {
    //     setValue(v);
    // };

    const editorStyle = `px-4 py-2 focus:ring-0 focus:outline-none ${className}`;

    return (
        <div className="flex flex-col-reverse" id={questionId || blockId}>
            <Slate
                editor={editor}
                initialValue={richtextDefault}
                value={value}
                onChange={(v) =>
                    dispatch(
                        action({
                            id: formId,
                            bId: blockId,
                            qId: questionId,
                            value: v,
                        })
                    )
                }
            >
                <Toolbar
                    className={`transition-height duration-[300ms] ease-in-out overflow-hidden ${
                        !isFocused ? "max-h-0" : "max-h-[100px]"
                    }`}
                >
                    <MarkButton format="bold" icon="format_bold" />
                    <MarkButton format="italic" icon="format_italic" />
                    <MarkButton format="underline" icon="format_underlined" />
                    <MarkButton format="code" icon="code" />
                    <BlockButton format="heading-one" icon="looks_one" />
                    <BlockButton format="heading-two" icon="looks_two" />
                    <BlockButton format="block-quote" icon="format_quote" />
                    <BlockButton
                        format="numbered-list"
                        icon="format_list_numbered"
                    />
                    <BlockButton
                        format="bulleted-list"
                        icon="format_list_bulleted"
                    />
                    <BlockButton format="left" icon="format_align_left" />
                    <BlockButton format="center" icon="format_align_center" />
                    <BlockButton format="right" icon="format_align_right" />
                    <BlockButton format="justify" icon="format_align_justify" />
                </Toolbar>

                <Editable
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`data-slate-editor ${editorStyle}`}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    spellCheck
                    onKeyDown={(event) => {
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event)) {
                                event.preventDefault();
                                const mark = HOTKEYS[hotkey];
                                toggleMark(editor, mark);
                            }
                        }
                    }}
                />
                {(editor.children.length === 0 ||
                    JSON.stringify(editor.children) ===
                        JSON.stringify(richtextDefault)) &&
                    !isFocused && (
                        <CustomPlaceholder
                            isFocused={isFocused}
                            className={`${placeholderClassName} h-0`}
                        >
                            <p>{placeholder}</p>
                        </CustomPlaceholder>
                    )}
            </Slate>
        </div>
    );
};

// const initialValue = [
//     {
//         type: "paragraph",
//         children: [{ text: "" }],
//     },
// ];
export default RichTextInput;
