/* eslint-disable react/react-in-jsx-scope */
"use client";
import SubNavBar from "@/app/(components)/SubNavBar";
import { makeClientGetUserInfoByIdRequest } from "@/app/utils/client.api.utils";
import { formMode } from "@/constants/formMode";
import {
    initializeExistingForm,
    resetForm,
    selectForm,
} from "@/lib/features/form/formSlice";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Details = () => {
    const { id } = useParams();
    const [authorInfo, setAuthorInfo] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            return () => dispatch(resetForm({ id }));
        }
    }, [id, dispatch]);

    const { theme } = useTheme();

    const form = useSelector((state) => selectForm(state, id));

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
        const getUserInfo = async () => {
            if (form && Object.keys(form).length > 0) {
                const data = await makeClientGetUserInfoByIdRequest(
                    form.AuthorId
                );
                setAuthorInfo(data.body);
            }
        };
        getUserInfo();
    }, [form]);
    return (
        <main className="main">
            <SubNavBar formId={id} />
            <div>{JSON.stringify(form)}</div>
            {authorInfo && <div>{JSON.stringify(authorInfo)}</div>}
            <div className="px-4 mt-4">
                <p className="text-xl">
                    <span className="font-semibold">Title: </span>
                    {form.Title}
                </p>
                <br />
                <p>Topic: {form.Topic}</p>
            </div>
        </main>
    );
};

export default Details;
