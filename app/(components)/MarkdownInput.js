/* eslint-disable react/prop-types */

import React, { useState, useCallback, useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markdown";
import {
    createEditor,
    Editor,
    Element as SlateElement,
    Node as SlateNode,
    Text,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { SHORTCUTS } from "./slatejs/markdown/constants";
import { Element, Leaf, withShortcuts } from "./slatejs/markdown/editor";
import CustomPlaceholder from "./slatejs/CustomPlaceholder";
import { useDispatch, useSelector } from "react-redux";
import { markdownDefault } from "@/constants/defaultValue";
import { selectFormMode } from "@/lib/features/form/formSlice";
import { formMode } from "@/constants/formMode";

const MarkdownInput = ({ placeholder, className, action, value, formId }) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => selectFormMode(state, formId));
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const editor = useMemo(
        () => withShortcuts(withReact(withHistory(createEditor()))),
        []
    );
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    const handleDOMBeforeInput = useCallback(() => {
        queueMicrotask(() => {
            const pendingDiffs = ReactEditor.androidPendingDiffs(editor);
            const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
                if (!diff.text.endsWith(" ")) {
                    return false;
                }
                const { text } = SlateNode.leaf(editor, path);
                const beforeText =
                    text.slice(0, diff.start) + diff.text.slice(0, -1);
                if (!(beforeText in SHORTCUTS)) {
                    return;
                }
                const blockEntry = Editor.above(editor, {
                    at: path,
                    match: (n) =>
                        SlateElement.isElement(n) && Editor.isBlock(editor, n),
                });
                if (!blockEntry) {
                    return false;
                }
                const [, blockPath] = blockEntry;
                return Editor.isStart(
                    editor,
                    Editor.start(editor, path),
                    blockPath
                );
            });
            if (scheduleFlush) {
                ReactEditor.androidScheduleFlush(editor);
            }
        });
    }, [editor]);

    const decorate = useCallback(([node, path]) => {
        const ranges = [];

        if (!Text.isText(node)) {
            return ranges;
        }

        const getLength = (token) => {
            if (typeof token === "string") {
                return token.length;
            } else if (typeof token.content === "string") {
                return token.content.length;
            } else {
                return token.content.reduce((l, t) => l + getLength(t), 0);
            }
        };
        const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
        let start = 0;
        for (const token of tokens) {
            const length = getLength(token);
            const end = start + length;
            if (typeof token !== "string") {
                ranges.push({
                    [token.type]: true,
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                });
            }
            start = end;
        }
        return ranges;
    }, []);

    const [isFocused, setIsFocused] = useState(false);
    const editorStyle = `p-2 pl-4 border-foreground focus:border-primary focus:ring-0 focus:outline-none ${className}`;
    return (
        <Slate
            editor={editor}
            initialValue={value}
            onChange={(v) => dispatch(action({ value: v, id: formId }))}
        >
            <Editable
                {...((mode === formMode.readonly ||
                    mode === formMode.respond) && { readOnly: true })}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                decorate={decorate}
                renderLeaf={renderLeaf}
                onDOMBeforeInput={handleDOMBeforeInput}
                renderElement={renderElement}
                spellCheck
                className={`${editorStyle}`}
            />
            {mode !== formMode.readonly &&
                mode !== formMode.respond &&
                (editor.children.length === 0 ||
                    JSON.stringify(editor.children) ===
                        JSON.stringify(markdownDefault)) &&
                !isFocused && (
                    <CustomPlaceholder
                        isFocused={isFocused}
                        className="pl-4 -translate-y-[32px] h-0"
                    >
                        <p>{placeholder || "Enter text here..."}</p>
                    </CustomPlaceholder>
                )}
        </Slate>
    );
};

// const initialValue = [
//     {
//         type: "paragraph",
//         children: [
//             {
//                 text: "",
//             },
//         ],
//     },
// ];
export default MarkdownInput;
