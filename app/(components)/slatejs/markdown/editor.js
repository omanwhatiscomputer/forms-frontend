/* eslint-disable react/prop-types */
import React from "react";
import {
    Editor,
    Element as SlateElement,
    Point,
    Range,
    Transforms,
} from "slate";
import { SHORTCUTS } from "./constants";

export const withShortcuts = (editor) => {
    const { deleteBackward, insertText } = editor;
    editor.insertText = (text) => {
        const { selection } = editor;
        if (text.endsWith(" ") && selection && Range.isCollapsed(selection)) {
            const { anchor } = selection;
            const block = Editor.above(editor, {
                match: (n) =>
                    SlateElement.isElement(n) && Editor.isBlock(editor, n),
            });
            const path = block ? block[1] : [];
            const start = Editor.start(editor, path);
            const range = { anchor, focus: start };
            const beforeText = Editor.string(editor, range) + text.slice(0, -1);
            const type = SHORTCUTS[beforeText];
            if (type) {
                Transforms.select(editor, range);
                if (!Range.isCollapsed(range)) {
                    Transforms.delete(editor);
                }
                const newProperties = {
                    type,
                };
                Transforms.setNodes(editor, newProperties, {
                    match: (n) =>
                        SlateElement.isElement(n) && Editor.isBlock(editor, n),
                });
                if (type === "list-item") {
                    const list = {
                        type: "bulleted-list",
                        children: [],
                    };
                    Transforms.wrapNodes(editor, list, {
                        match: (n) =>
                            !Editor.isEditor(n) &&
                            SlateElement.isElement(n) &&
                            n.type === "list-item",
                    });
                }
                return;
            }
        }
        insertText(text);
    };
    editor.deleteBackward = (...args) => {
        const { selection } = editor;
        if (selection && Range.isCollapsed(selection)) {
            const match = Editor.above(editor, {
                match: (n) =>
                    SlateElement.isElement(n) && Editor.isBlock(editor, n),
            });
            if (match) {
                const [block, path] = match;
                const start = Editor.start(editor, path);
                if (
                    !Editor.isEditor(block) &&
                    SlateElement.isElement(block) &&
                    block.type !== "paragraph" &&
                    Point.equals(selection.anchor, start)
                ) {
                    const newProperties = {
                        type: "paragraph",
                    };
                    Transforms.setNodes(editor, newProperties);
                    if (block.type === "list-item") {
                        Transforms.unwrapNodes(editor, {
                            match: (n) =>
                                !Editor.isEditor(n) &&
                                SlateElement.isElement(n) &&
                                n.type === "bulleted-list",
                            split: true,
                        });
                    }
                    return;
                }
            }
            deleteBackward(...args);
        }
    };
    return editor;
};
export const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "heading-three":
            return <h3 {...attributes}>{children}</h3>;
        case "heading-four":
            return <h4 {...attributes}>{children}</h4>;
        case "heading-five":
            return <h5 {...attributes}>{children}</h5>;
        case "heading-six":
            return <h6 {...attributes}>{children}</h6>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};
