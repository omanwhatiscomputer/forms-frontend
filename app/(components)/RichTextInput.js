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

const RichTextInput = () => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const [value, setValue] = useState(initialValue);
    const handleValueChange = (v) => {
        setValue(v);
    };

    return (
        <div className="flex flex-col-reverse">
            <Slate
                editor={editor}
                initialValue={initialValue}
                value={value}
                onChange={handleValueChange}
            >
                <Toolbar>
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
                    className="data-slate-editor"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Enter some rich text…"
                    spellCheck
                    autoFocus
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
            </Slate>
        </div>
    );
};

const initialValue = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];
export default RichTextInput;
