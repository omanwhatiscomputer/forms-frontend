/* eslint-disable react/react-in-jsx-scope */
"use client";

import {
    selectUserId,
    selectUserIsSignedIn,
} from "@/lib/features/general/authSlice";
import Link from "next/link";
import { useSelector } from "react-redux";
import { makeClientGetAllFormsRequest } from "./utils/client.api.utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

export default function Home() {
    const isSignedIn = useSelector((state) => selectUserIsSignedIn(state));
    const userId = useSelector((state) => selectUserId(state));
    const [forms, setForms] = useState([]);
    useEffect(() => {
        const getForms = async () => {
            const res = await makeClientGetAllFormsRequest();

            setForms(res.body.filter((i) => i.authorId !== userId));
        };
        getForms();
    }, []);
    const router = useRouter();
    return (
        <main className="main">
            <div className="flex justify-end">
                <Link
                    href={"/latest"}
                    className="hover:text-primary text-sky-400 mr-4"
                >
                    View all latest forms
                </Link>
                <br />
                <Link
                    href={"/popular"}
                    className="hover:text-primary text-sky-400 mr-4"
                >
                    View all popular forms
                </Link>
            </div>
            <p className="ml-6">All Forms</p>
            {forms.length > 0 && (
                <div className="mt-4 mx-6">
                    {forms.map((f) => (
                        <div
                            key={f.formTemplateId}
                            className="flex w-full justify-between border-b-[1px] border-foreground border-dotted"
                        >
                            <div className="ml-4 " key={f.formTemplateId}>
                                <span className="font-bold">{f.title}</span>
                                <br />
                                {f.description}
                            </div>
                            <div>
                                <button
                                    onClick={async () => {
                                        await router.push(
                                            `/viewform/${f.formTemplateId}`
                                        );
                                        router.refresh();
                                    }}
                                    className="text-sky-400 mx-4"
                                    type="button"
                                >
                                    View
                                </button>
                                {isSignedIn && (
                                    <button
                                        onClick={async () => {
                                            await router.push(
                                                `/form/${
                                                    f.formTemplateId
                                                }/respond/${v4()}`
                                            );
                                            router.refresh();
                                        }}
                                        className="text-sky-400 mx-4"
                                        type="button"
                                    >
                                        Respond
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
