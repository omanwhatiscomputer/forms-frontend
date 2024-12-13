"use client";

import React, { useState } from "react";

import ImageUpload from "@/app/(components)/ImageUpload";
import { ThemeToggler } from "@/app/(components)/ThemeToggler";
import RichTextInput from "@/app/(components)/RichTextInput";
import MarkdownInput from "@/app/(components)/MarkdownInput";

export default function Home() {
    // const [openModal, setOpenModal] = useState(false);

    return (
        <div className="">
            <p>Hello world</p>

            {/* <RichTextInput /> */}

            {/* <MarkdownInput /> */}

            {/* <ThemeToggler />
            <ImageUpload openModal={openModal} setOpenModal={setOpenModal} />
            <div>
                <button type="button" onClick={() => setOpenModal(true)}>
                    Image upload
                </button>
            </div> */}
        </div>
    );
}
