"use client";
import SubNavBar from "@/app/(components)/SubNavBar";
import { makeClientGetAllFormResponseInfosByFormTemplateId } from "@/app/utils/client.api.utils";
import { formMode } from "@/constants/formMode";
import {
    initializeExistingForm,
    resetForm,
} from "@/lib/features/form/formSlice";
import { selectUserType } from "@/lib/features/general/authSlice";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "flowbite-react";
import Link from "next/link";

/* eslint-disable react/react-in-jsx-scope */
const Responses = () => {
    const { id } = useParams();
    const [responses, setResponses] = useState(null);
    const dispatch = useDispatch();
    const userType = useSelector((state) => selectUserType(state));

    useEffect(() => {
        if (id) {
            return () => dispatch(resetForm({ id }));
        }
    }, [id, dispatch]);

    const { theme } = useTheme();

    useEffect(() => {
        const fetchForm = async () => {
            await dispatch(resetForm({ id }));
            await dispatch(
                initializeExistingForm({
                    formId: id,
                    theme: theme,
                    mode: formMode.readonly,
                })
            );
        };
        fetchForm();
    }, [id, dispatch]);

    useEffect(() => {
        const getResponses = async () => {
            const result =
                await makeClientGetAllFormResponseInfosByFormTemplateId(id);

            setResponses(result.body);
        };
        getResponses();
    }, [id]);
    return (
        <main className="main">
            <SubNavBar formId={id} />

            {responses && responses.length > 0 && (
                <div>{JSON.stringify(responses)}</div>
            )}
            {responses && responses.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Form Title</Table.HeadCell>
                            <Table.HeadCell>Respondent Name</Table.HeadCell>
                            <Table.HeadCell>Respondent Email</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">View</span>
                            </Table.HeadCell>
                            {userType === "Admin" && (
                                <Table.HeadCell>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            )}
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {responses.map((resp) => (
                                <Table.Row
                                    key={resp.id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {resp.title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {resp.respondentFullName}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {resp.respondentEmail}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            href={`/response/${resp.id}`}
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        >
                                            View
                                        </Link>
                                    </Table.Cell>
                                    {userType === "Admin" && (
                                        <Table.Cell>
                                            <Link
                                                href={`/response/${resp.id}/${resp.parentTemplateId}/update`}
                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                            >
                                                Edit
                                            </Link>
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            ) : (
                <p>No responses recorded!</p>
            )}
        </main>
    );
};

export default Responses;
