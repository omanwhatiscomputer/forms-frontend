/* eslint-disable react/react-in-jsx-scope */
"use client";

import BlockResponse from "@/app/(components)/BlockResponse";
import FormBlockReorderIcon from "@/app/(components)/dragDropComponents/FormBlockReorderIcon";
import BlockBody from "@/app/(components)/formComponents/BlockComponents/BlockBody";
import BlockHeader from "@/app/(components)/formComponents/BlockComponents/BlockHeader";
import FormBlock from "@/app/(components)/formComponents/FormBlock";

import FormHeader from "@/app/(components)/formComponents/FormHeader";
import FormMenu from "@/app/(components)/formComponents/FormMenu";
import FormTag from "@/app/(components)/formComponents/FormTag";
import { formMode } from "@/constants/formMode";
import { formStyle } from "@/constants/misc";
import {
    initializeExistingForm,
    resetForm,
    selectFormBlocks,
} from "@/lib/features/form/formSlice";
import {
    initializeFormResponse,
    selectFormResponseBlocks,
} from "@/lib/features/form/responseSlice";
import { selectUserId } from "@/lib/features/general/authSlice";

import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RespondToForm = () => {
    const [activeBlock, setActiveBlock] = useState(null);

    const dispatch = useDispatch();
    const { responseId, id } = useParams();
    useEffect(() => {
        if (id) {
            return () => dispatch(resetForm(id));
        }
    }, [id, dispatch]);

    const { theme } = useTheme();

    const formBlocks = useSelector((state) => selectFormBlocks(state, id));
    const formResponseBlocks = useSelector((state) =>
        selectFormResponseBlocks(state, responseId)
    );
    const userId = useSelector((state) => selectUserId(state));
    useEffect(() => {
        const fetchForm = async () => {
            await dispatch(
                initializeExistingForm({
                    formId: id,
                    theme: theme,
                    mode: formMode.respond,
                })
            );
        };
        fetchForm();
    }, []);

    useEffect(() => {
        const initFormResponseObject = async () => {
            await dispatch(
                initializeFormResponse({
                    blocks: formBlocks.map((b) => ({
                        blockId: b.Id,
                        blockType: b.BlockType,
                        isRequired: b.IsRequired,
                    })),
                    formId: id,
                    id: responseId,
                    userId: userId,
                })
            );
        };
        if (formBlocks.length > 0) {
            initFormResponseObject();
        }
    }, [formBlocks]);

    return (
        <main className="main">
            <FormMenu />
            <div className={`${formStyle}`}>
                <FormBlock
                    className={"mt-2"}
                    blockId={"metadata"}
                    activeBlock={activeBlock}
                    setActiveBlock={setActiveBlock}
                >
                    <FormHeader />
                    <FormTag formId={id} />
                </FormBlock>

                {formBlocks.map((block, idx) => (
                    <div key={idx}>
                        <FormBlockReorderIcon
                            idx={idx}
                            className={
                                "mt-4 bg-primary rounded-r-lg w-[150px] max-w-[165px]"
                            }
                        />
                        <FormBlock
                            key={block.Id}
                            blockId={block.Id}
                            activeBlock={activeBlock}
                            setActiveBlock={setActiveBlock}
                        >
                            <BlockHeader blockId={block.Id} />
                            <BlockBody blockId={block.Id} />
                            <BlockResponse
                                blockType={block.BlockType}
                                blockId={block.Id}
                                responseId={responseId}
                                formResponseBlocks={formResponseBlocks}
                                checkboxOptions={block.CheckboxOptions}
                            />
                        </FormBlock>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default RespondToForm;

// TestCase:
// FormID: 62b7a3ab-b5ae-428e-a525-3b587bbbadde

/**
 * 
 * ResponseObject:

    Id
    ParentTemplateId
    RespondentId
    RespondedAt
    BlockResponses =>
        [
            Id
            IsRequired
            ResponseObjectId
            ParentTemplateId
            RespondentId
            BlockId
            BlockType
            Content
        ]
 */
