"use client";

import React, { useState } from "react";

import ImageUpload from "./(components)/ImageUpload";
import { ThemeToggler } from "./(components)/ThemeToggler";
import RichTextInput from "./(components)/RichTextInput";
import MarkdownInput from "./(components)/MarkdownInput";

export default function Home() {
    // const [openModal, setOpenModal] = useState(false);

    return (
        <main className="main">
            <p>Hello WTF</p>
            <p>Hello WTF2</p>
            <p>Hello WTF3</p>
            <p>Hello WTF4</p>
            <p>Hello WTF5</p>
            <p>Hello WTF</p>
            <p>Hello WTF2</p>
            <p>Hello WTF3</p>
            <p>Hello WTF4</p>
            <p>Hello WTF5</p>

            {/* <RichTextInput /> */}

            {/* <MarkdownInput /> */}

            {/* <ThemeToggler />
            <ImageUpload openModal={openModal} setOpenModal={setOpenModal} />
            <div>
                <button type="button" onClick={() => setOpenModal(true)}>
                    Image upload
                </button>
            </div> */}
        </main>
    );
}
