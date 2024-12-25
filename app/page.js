/* eslint-disable react/react-in-jsx-scope */
"use client";

import Link from "next/link";

export default function Home() {
    return (
        <main className="main">
            <Link href={"/latest"} className="hover:text-primary text-sky-400">
                View all latest forms
            </Link>
            <br />
            <Link href={"/popular"} className="hover:text-primary text-sky-400">
                View all popular forms
            </Link>
        </main>
    );
}
