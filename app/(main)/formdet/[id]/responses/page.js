"use client";
import SubNavBar from "@/app/(components)/SubNavBar";
import { makeClientGetAllFormResponseInfosByFormTemplateId } from "@/app/utils/client.api.utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/* eslint-disable react/react-in-jsx-scope */
const Responses = () => {
    const { id } = useParams();
    const [responses, setResponses] = useState(null);
    useEffect(() => {
        const getResponses = async () => {
            const result =
                await makeClientGetAllFormResponseInfosByFormTemplateId(id);

            setResponses(result.body);
        };
        getResponses();
    }, []);
    return (
        <main className="main">
            <SubNavBar formId={id} />
            Responses
            <div>{responses && JSON.stringify(responses)}</div>
        </main>
    );
};

export default Responses;
