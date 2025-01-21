"use client";
import SubNavBar from "@/app/(components)/SubNavBar";
import { makeClientGetAllFormResponseInfosByFormTemplateId } from "@/app/utils/client.api.utils";
import { formMode } from "@/constants/formMode";
import {
    initializeExistingForm,
    resetForm,
} from "@/lib/features/form/formSlice";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/* eslint-disable react/react-in-jsx-scope */
const Responses = () => {
    const { id } = useParams();
    const [responses, setResponses] = useState(null);
    const dispatch = useDispatch();

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
            Responses
            {responses && responses.length > 0 && (
                <div>{JSON.stringify(responses)}</div>
            )}
        </main>
    );
};

export default Responses;
