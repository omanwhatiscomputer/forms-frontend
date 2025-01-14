/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

// import React, { useState, useCallback, useMemo } from "react";
// import Prism from "prismjs";
// import "prismjs/components/prism-markdown";
// import {
//     createEditor,
//     Editor,
//     Element as SlateElement,
//     Node as SlateNode,
//     Text,
// } from "slate";
// import { withHistory } from "slate-history";
// import { Editable, ReactEditor, Slate, withReact } from "slate-react";
// import { SHORTCUTS } from "./slatejs/markdown/constants";
// import { Element, Leaf, withShortcuts } from "./slatejs/markdown/editor";
// import CustomPlaceholder from "./slatejs/CustomPlaceholder";
import { useDispatch, useSelector } from "react-redux";
// import { markdownDefault } from "@/constants/defaultValue";
import { selectFormMode } from "@/lib/features/form/formSlice";
import { formMode } from "@/constants/formMode";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownInput = ({ placeholder, className, action, value, formId }) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => selectFormMode(state, formId));

    const editorStyle = `p-2 pl-4 border-foreground focus:border-primary focus:ring-0 focus:outline-none`;
    return (
        <div>
            <textarea
                className={`${editorStyle} ${
                    (mode === formMode.readonly || mode === formMode.respond) &&
                    "hidden"
                } w-full bg-background text-foreground border-[1px]`}
                type="text"
                rows="3"
                value={value}
                onChange={(e) =>
                    dispatch(action({ value: e.target.value, id: formId }))
                }
                placeholder={placeholder}
            />

            <Markdown
                remarkPlugins={[remarkGfm]}
                className={`${editorStyle} ${className} mt-8`}
            >
                {value}
            </Markdown>
        </div>
    );
};

export default MarkdownInput;
