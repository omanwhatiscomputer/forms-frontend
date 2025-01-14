"use client";

/* eslint-disable react/react-in-jsx-scope */
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reorder } from "framer-motion";
import {
    initializeExistingForm,
    reorderFormBlock,
    resetForm,
    selectFormBlocks,
} from "@/lib/features/form/formSlice";
import FormBlock from "@/app/(components)/formComponents/FormBlock";
import FormHeader from "@/app/(components)/formComponents/FormHeader";
import FormMenu from "@/app/(components)/formComponents/FormMenu";
import FormTag from "@/app/(components)/formComponents/FormTag";
import FormBlockDnDItem from "@/app/(components)/formComponents/FormBlockDnDItem";
import { formMode } from "@/constants/formMode";
import { formStyle } from "@/constants/misc";

const UpdateForm = () => {
    const { id } = useParams();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            return () => dispatch(resetForm({ id: id }));
        }
    }, [id, dispatch]);
    useEffect(() => {
        const init = async () => {
            await dispatch(resetForm({ id: id }));
            await dispatch(
                initializeExistingForm({
                    formId: id,
                    theme: theme,
                    mode: formMode.update,
                })
            );
        };
        init();
    }, [id, dispatch]);
    const formBlocks = useSelector((state) => selectFormBlocks(state, id));
    const [activeBlock, setActiveBlock] = useState(null);
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

                <Reorder.Group
                    axis="y"
                    onReorder={(val) =>
                        dispatch(reorderFormBlock({ id: id, blocks: val }))
                    }
                    values={formBlocks}
                >
                    {formBlocks.map((block, idx) => (
                        <FormBlockDnDItem
                            key={block.Id}
                            block={block}
                            idx={idx}
                            activeBlock={activeBlock}
                            setActiveBlock={setActiveBlock}
                        />
                    ))}
                </Reorder.Group>
            </div>
        </main>
    );
};

export default UpdateForm;
