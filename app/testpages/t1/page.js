/* eslint-disable react/react-in-jsx-scope */
"use client";

import ImageUpload from "@/app/(components)/ImageUpload";
import React, { useState } from "react";

// import ImageUpload from "./(components)/ImageUpload";
// import { ThemeToggler } from "./(components)/ThemeToggler";
// import RichTextInput from "./(components)/RichTextInput";
// import MarkdownInput from "./(components)/MarkdownInput";

export default function Home() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <main className="main">
            <ImageUpload openModal={openModal} setOpenModal={setOpenModal} />
            <div>
                <button type="button" onClick={() => setOpenModal(true)}>
                    Image upload
                </button>
            </div>
        </main>
    );
}
