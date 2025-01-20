/* eslint-disable react/react-in-jsx-scope */
"use client";
import { makeClientGetAllFormsByUserIdRequest } from "@/app/utils/client.api.utils";
import { selectUserId } from "@/lib/features/general/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const Dashboard = () => {
    const userId = useSelector(selectUserId);
    const [forms, setForms] = useState([]);
    useEffect(() => {
        const getForms = async () => {
            const res = await makeClientGetAllFormsByUserIdRequest(userId);
            setForms(res.body);
        };
        getForms();
    }, [userId]);
    const router = useRouter();

    return (
        <main className="main">
            <div className="w-full px-4 flex justify-end hover:text-primary">
                <Link href={`/myforms/createform/${uuidv4()}`}>CreateForm</Link>
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
            {forms.length > 0 && (
                <div className="mt-4 mx-6">
                    {forms.map((f) => (
                        <div
                            key={f.formTemplateId}
                            className="flex w-full justify-between border-b-[1px] border-foreground border-dotted"
                        >
                            <div className="ml-4 " key={f.formTemplateId}>
                                <Link
                                    href={`/formdet/${f.formTemplateId}/details`}
                                    className="text-sky-400 hover:text-primary"
                                >
                                    {f.title}
                                </Link>
                                <br />
                                {f.description}
                            </div>
                            <div>
                                <button
                                    onClick={async () => {
                                        await router.push(
                                            `/form/${f.formTemplateId}`
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
                                            `/myforms/updateform/${f.formTemplateId}`
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

export default Dashboard;
