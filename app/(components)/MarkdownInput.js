/* eslint-disable react/prop-types */
import React, { useCallback, useMemo } from "react";
import {
    createEditor,
    Editor,
    Element as SlateElement,
    Node as SlateNode,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { SHORTCUTS } from "./slatejs/markdown/constants";
import { Element, withShortcuts } from "./slatejs/markdown/editor";

const MarkdownInput = () => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const editor = useMemo(
        () => withShortcuts(withReact(withHistory(createEditor()))),
        []
    );
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
    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable
                onDOMBeforeInput={handleDOMBeforeInput}
                renderElement={renderElement}
                placeholder="Write some markdown..."
                spellCheck
                autoFocus
            />
        </Slate>
    );
};

const initialValue = [
    {
        type: "paragraph",
        children: [
            {
                text: "",
            },
        ],
    },
];
export default MarkdownInput;
