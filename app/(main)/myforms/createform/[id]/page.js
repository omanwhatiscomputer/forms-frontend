/* eslint-disable react/react-in-jsx-scope */
"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";

import FormBlock from "@/app/(components)/formComponents/FormBlock";
import FormHeader from "@/app/(components)/formComponents/FormHeader";
import FormMenu from "@/app/(components)/formComponents/FormMenu";
import FormTag from "@/app/(components)/formComponents/FormTag";
import { formMode } from "@/constants/formMode";
import {
    initializeForm,
    reorderFormBlock,
    resetForm,
    selectFormBlocks,
} from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Reorder } from "framer-motion";
import FormBlockDnDItem from "@/app/(components)/formComponents/FormBlockDnDItem";
import { selectUserId } from "@/lib/features/general/authSlice";
import { formStyle } from "@/constants/misc";

const CreateForm = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            return () => dispatch(resetForm(id));
        }
    }, [id, dispatch]);

    const userId = useSelector((state) => selectUserId(state));
    useEffect(() => {
        dispatch(initializeForm({ id, mode: formMode.create, userId: userId }));
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

export default CreateForm;
