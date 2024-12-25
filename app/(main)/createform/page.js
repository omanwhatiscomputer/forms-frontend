/* eslint-disable react/react-in-jsx-scope */
"use client";
import BlockBody from "@/app/(components)/formComponents/BlockComponents/BlockBody";
import BlockHeader from "@/app/(components)/formComponents/BlockComponents/BlockHeader";
import FormBlock from "@/app/(components)/formComponents/FormBlock";
import FormHeader from "@/app/(components)/formComponents/FormHeader";
import FormMenu from "@/app/(components)/formComponents/FormMenu";
import FormTag from "@/app/(components)/formComponents/FormTag";
import {
    initializeForm,
    selectFormBlocks,
} from "@/lib/features/form/formSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateForm = () => {
    const dispatch = useDispatch();
    const formBlocks = useSelector(selectFormBlocks);
    useEffect(() => {
        dispatch(initializeForm());
    }, []);
    return (
        <main className="main">
            <FormMenu />
            <div className="w-full px-5 sm:px-10 md:px-36 lg:px-64 xl:px-96">
                <FormBlock className={"mt-2"}>
                    <FormHeader />
                    <FormTag />
                </FormBlock>

                {formBlocks.map((block) => (
                    <FormBlock
                        key={block.Id}
                        blockId={block.Id}
                        className={"mt-8"}
                        displayMenu
                    >
                        <BlockHeader blockId={block.Id} />
                        <BlockBody blockId={block.Id} />
                    </FormBlock>
                ))}
            </div>
        </main>
    );
};

export default CreateForm;
