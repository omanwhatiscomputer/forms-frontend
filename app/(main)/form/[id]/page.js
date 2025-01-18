/* eslint-disable react/react-in-jsx-scope */
"use client";
export const dynamic = "force-dynamic";
import FormBlockReorderIcon from "@/app/(components)/dragDropComponents/FormBlockReorderIcon";
import BlockBody from "@/app/(components)/formComponents/BlockComponents/BlockBody";
import BlockHeader from "@/app/(components)/formComponents/BlockComponents/BlockHeader";
import FormBlock from "@/app/(components)/formComponents/FormBlock";

import FormHeader from "@/app/(components)/formComponents/FormHeader";
import FormTag from "@/app/(components)/formComponents/FormTag";
import { formMode } from "@/constants/formMode";
import { formStyle } from "@/constants/misc";
import {
    initializeExistingForm,
    resetForm,
    selectFormBlocks,
} from "@/lib/features/form/formSlice";

import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewForm = () => {
    const [activeBlock, setActiveBlock] = useState(null);

    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            return () => dispatch(resetForm({ id }));
        }
    }, [id, dispatch]);

    const { theme } = useTheme();

    const formBlocks = useSelector((state) => selectFormBlocks(state, id));

    useEffect(() => {
        const fetchForm = async () => {
            await dispatch(resetForm({ id }));
            await dispatch(
                initializeExistingForm({
                    formId: id,
                    theme: theme,
                    mode: formMode.readonly,
                })
            );
        };
        fetchForm();
    }, [id, dispatch]);

    return (
        <main className="main">
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
                        </FormBlock>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ViewForm;
