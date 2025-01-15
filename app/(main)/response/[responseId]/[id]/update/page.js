/* eslint-disable react/react-in-jsx-scope */
// update
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
import { responseMode } from "@/constants/responseMode";
import {
    initializeExistingForm,
    resetForm,
    selectFormBlocks,
} from "@/lib/features/form/formSlice";
import {
    initializeExistingResponseObject,
    resetFormResponseObject,
    resetFormResponseValidationObject,
    selectFormResponseBlocks,
} from "@/lib/features/form/responseSlice";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdateFormResponse = () => {
    const [activeBlock, setActiveBlock] = useState(null);

    const dispatch = useDispatch();
    const { responseId, id } = useParams();
    useEffect(() => {
        if (id) {
            return () => {
                dispatch(resetForm({ id }));
                dispatch(resetFormResponseObject({ id: responseId }));
                dispatch(resetFormResponseValidationObject({ id: responseId }));
            };
        }
    }, [id, responseId, dispatch]);

    const { theme } = useTheme();
    const formBlocks = useSelector((state) => selectFormBlocks(state, id));
    const formResponseBlocks = useSelector((state) =>
        selectFormResponseBlocks(state, responseId)
    );
    useEffect(() => {
        const fetchForm = async () => {
            await dispatch(resetForm({ id }));
            await dispatch(
                initializeExistingForm({
                    formId: id,
                    theme: theme,
                    mode: formMode.respond,
                })
            );
        };
        fetchForm();
    }, [id, dispatch, responseId]);

    useEffect(() => {
        const initExistingFormResponseObject = async () => {
            await dispatch(
                initializeExistingResponseObject({
                    responseObjectId: responseId,
                    mode: responseMode.update,
                    theme: theme,
                })
            );
        };
        if (formBlocks.length > 0) {
            initExistingFormResponseObject();
        }
    }, [formBlocks, id, dispatch, responseId]);

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

export default UpdateFormResponse;
