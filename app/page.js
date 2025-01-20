/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Tabs } from "flowbite-react";
import {
    selectUserId,
    selectUserIsSignedIn,
    selectUserType,
} from "@/lib/features/general/authSlice";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
    makeClientGetAllFormsResponseByRespondentId,
    makeClientGetAllPrivateFormTemplatesByAuthorizedUserIdRequest,
    makeClientGetAllPrivateFormTemplatesRequest,
    makeClientGetAllPublicFormTemplatesRequest,
} from "./utils/client.api.utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { customTheme } from "@/constants/customFlowbiteTheme";

export default function Home() {
    const isSignedIn = useSelector((state) => selectUserIsSignedIn(state));
    const userId = useSelector((state) => selectUserId(state));
    const userType = useSelector((state) => selectUserType(state));
    const [forms, setForms] = useState([]);
    const [privateForms, setPrivateForms] = useState([]);
    useEffect(() => {
        const getForms = async () => {
            // const res = await makeClientGetAllFormsRequest();

            const res = await makeClientGetAllPublicFormTemplatesRequest();

            if (isSignedIn) {
                const privateForms =
                    userType === "Admin"
                        ? await makeClientGetAllPrivateFormTemplatesRequest()
                        : await makeClientGetAllPrivateFormTemplatesByAuthorizedUserIdRequest(
                              userId
                          );
                setPrivateForms(
                    privateForms.body.filter((i) => i.authorId !== userId)
                );

                const formResponseObjs =
                    await makeClientGetAllFormsResponseByRespondentId(userId);

                if (formResponseObjs && formResponseObjs.body.length > 0) {
                    setForms(
                        res.body
                            .filter((i) => i.authorId !== userId)
                            .map((f) => ({
                                ...f,
                                hasResponded: formResponseObjs.body
                                    .map((fro) => fro.parentTemplateId)
                                    .includes(f.formTemplateId),
                            }))
                    );
                } else {
                    setForms(res.body.filter((i) => i.authorId !== userId));
                }
            } else {
                setForms(res.body.filter((i) => i.authorId !== userId));
            }
        };
        getForms();
    }, [isSignedIn]);
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
            {!isSignedIn && <p className="ml-6">All Forms</p>}
            {isSignedIn ? (
                <Tabs
                    aria-label="Pills"
                    variant="underline"
                    theme={customTheme}
                >
                    <Tabs.Item active title="Public Forms">
                        {forms.length > 0 && (
                            <div className="mt-4 mx-6">
                                {forms.map((f) => (
                                    <div
                                        key={f.formTemplateId}
                                        className="flex w-full justify-between border-b-[1px] border-foreground border-dotted"
                                    >
                                        <div
                                            className="ml-4 "
                                            key={f.formTemplateId}
                                        >
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
                                                        `/viewform/${f.formTemplateId}`
                                                    );
                                                    router.refresh();
                                                }}
                                                className="text-sky-400 mx-4"
                                                type="button"
                                            >
                                                View
                                            </button>
                                            {isSignedIn && !f.hasResponded && (
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
                    </Tabs.Item>
                    <Tabs.Item title="Private Forms">
                        {privateForms.length > 0 ? (
                            <div className="mt-4 mx-6">
                                {privateForms.map((f) => (
                                    <div
                                        key={f.formTemplateId}
                                        className="flex w-full justify-between border-b-[1px] border-foreground border-dotted"
                                    >
                                        <div
                                            className="ml-4 "
                                            key={f.formTemplateId}
                                        >
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
                                                        `/viewform/${f.formTemplateId}`
                                                    );
                                                    router.refresh();
                                                }}
                                                className="text-sky-400 mx-4"
                                                type="button"
                                            >
                                                View
                                            </button>
                                            {isSignedIn && !f.hasResponded && (
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
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                You do not have access to any private forms
                            </p>
                        )}
                    </Tabs.Item>
                </Tabs>
            ) : (
                forms.length > 0 && (
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
                                                `/viewform/${f.formTemplateId}`
                                            );
                                            router.refresh();
                                        }}
                                        className="text-sky-400 mx-4"
                                        type="button"
                                    >
                                        View
                                    </button>
                                    {isSignedIn && !f.hasResponded && (
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
                )
            )}
        </main>
    );
}
