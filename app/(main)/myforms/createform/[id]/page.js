/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useEffect, useState } from "react";

import FormBlock from "@/app/(components)/formComponents/FormBlock";
import FormHeader from "@/app/(components)/formComponents/FormHeader";
import FormMenu from "@/app/(components)/formComponents/FormMenu";
import FormTag from "@/app/(components)/formComponents/FormTag";
import { formMode } from "@/constants/formMode";
import {
    initializeForm,
    reorderFormBlock,
    selectFormBlocks,
} from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Reorder } from "framer-motion";
import FormBlockDnDItem from "@/app/(components)/formComponents/FormBlockDnDItem";

const CreateForm = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeForm({ id, mode: formMode.create }));
    }, [id, dispatch]);

    const formBlocks = useSelector((state) => selectFormBlocks(state, id));

    const [activeBlock, setActiveBlock] = useState(null);

    return (
        <main className="main">
            <FormMenu />
            <div className="w-full px-5 sm:px-10 md:px-36 lg:px-64 xl:px-96">
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
