/* eslint-disable react/react-in-jsx-scope */
"use client";
import { makeClientGetAllFormsResponseByRespondentId } from "@/app/utils/client.api.utils";
import { selectUserId } from "@/lib/features/general/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

const MyResponses = () => {
    const userId = useSelector(selectUserId);
    const [forms, setForms] = useState([]);
    useEffect(() => {
        const getForms = async () => {
            const res = await makeClientGetAllFormsResponseByRespondentId(
                userId
            );

            setForms(res.body);
        };
        getForms();
    }, [userId]);
    const router = useRouter();

    return (
        <main className="main">
            <div className="w-full px-4 flex justify-end hover:text-primary">
                <Link href={`/myforms/createform/${v4()}`}>CreateForm</Link>
            </div>
            <div>
                <Link className="hover:text-primary ml-6" href={"/dashboard"}>
                    My Forms
                </Link>
                <Link
                    className="hover:text-primary ml-6"
                    href={"/dashboard/myresponses"}
                >
                    My Responses
                </Link>
            </div>
            <br />
            {forms && forms.length > 0 && (
                <div className="mt-4 mx-6">
                    {forms.map((f) => (
                        <div
                            key={f.id}
                            className="flex w-full justify-between border-b-[1px] border-foreground border-dotted"
                        >
                            <div className="ml-4 " key={f.id}>
                                <span className="font-bold">{f.title}</span>
                                <br />
                                Responded at: {f.respondedAt}
                            </div>
                            <div>
                                <button
                                    onClick={async () => {
                                        await router.push(
                                            `/response/${f.id}/${f.parentTemplateId}`
                                        );
                                        router.refresh();
                                    }}
                                    className="text-sky-400 mx-4"
                                    type="button"
                                >
                                    View
                                </button>
                                <button
                                    onClick={async () => {
                                        await router.push(
                                            `/response/${f.id}/${f.parentTemplateId}/update`
                                        );
                                        router.refresh();
                                    }}
                                    className="text-sky-400 mx-4"
                                    type="button"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default MyResponses;
