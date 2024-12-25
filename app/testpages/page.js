/* eslint-disable react/react-in-jsx-scope */
"use client";

import React, { useState } from "react";
import FormHeader from "../(components)/formComponents/FormHeader";
import FormBlock from "../(components)/formComponents/FormBlock";
import BlockHeader from "../(components)/formComponents/BlockComponents/BlockHeader";
import BlockBody from "../(components)/formComponents/BlockComponents/BlockBody";
import FormMenu from "../(components)/formComponents/FormMenu";

// import RichTextInput from "@/app/(components)/RichTextInput";
// import MarkdownInput from "@/app/(components)/MarkdownInput";

export default function TestPage() {
    return (
        <main className="main">
            <FormMenu />
            <div className="w-full px-5 sm:px-10 md:px-36 lg:px-64 xl:px-96">
                <FormBlock className={"mt-2"}>
                    <FormHeader />
                </FormBlock>
                <FormBlock className={"mt-8"} displayMenu>
                    <BlockHeader />
                    <BlockBody />
                </FormBlock>
            </div>
        </main>
    );
}
