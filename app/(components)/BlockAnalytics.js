"use client";
import { useEffect, useState } from "react";
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SectionDivider from "./common/SectionDivider";
import { makeClientGetBlockResponseAnalyticsRequest } from "../utils/client.api.utils";
import { inputType } from "@/constants/inputType";

const BlockAnalytics = ({
    blockType,
    blockCheckboxOptions,
    formId,
    blockId,
}) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const getBlockAnalytics = async () => {
            const result = await makeClientGetBlockResponseAnalyticsRequest(
                formId,
                blockId
            );
            setData(result.body);
        };
        getBlockAnalytics();
    }, [blockId, formId]);

    const renderData = (data) => {
        switch (blockType) {
            case inputType[0]:
                return (
                    <div>
                        {data.type}: {data.value}
                    </div>
                );
            case inputType[1]:
                return (
                    <div className="flex">
                        <div className="mr-4">{data.type}:</div>
                        <div>
                            <ol>
                                {Object.keys(JSON.parse(data.value)).map(
                                    (k, idx) => (
                                        <li key={k}>
                                            {" "}
                                            {idx + 1}. {k.replace(/['"]+/g, "")}
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>
                    </div>
                );
            case inputType[2]:
                return (
                    <div>
                        {data.type}: {data.value}
                    </div>
                );
            case inputType[3]:
                return (
                    <div>
                        {data.type}:{" "}
                        {
                            blockCheckboxOptions.find(
                                (o) => o.Id === JSON.parse(data.value)
                            ).Content
                        }
                    </div>
                );
            case inputType[4]:
                return (
                    <div className="flex">
                        <div className="mr-4">{data.type}:</div>
                        <div>
                            <ol>
                                {Object.keys(JSON.parse(data.value)).map(
                                    (k, idx) => (
                                        <li key={k.replace(/['"]+/g, "")}>
                                            {" "}
                                            {idx + 1}.{" "}
                                            {
                                                blockCheckboxOptions.find(
                                                    (o) => o.Id === k
                                                ).Content
                                            }
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>
                    </div>
                );
        }
    };
    return (
        <div>
            <SectionDivider content={"Response Statistics"} />

            {data && <div className="my-4">{renderData(data)} </div>}
        </div>
    );
};

export default BlockAnalytics;
