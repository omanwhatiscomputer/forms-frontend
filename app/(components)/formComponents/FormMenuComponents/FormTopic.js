/* eslint-disable react/react-in-jsx-scope */
import { getAllFormTopics } from "@/app/utils/client.api.utils";
import {
    selectFormTopic,
    updateFormTopic,
} from "@/lib/features/form/formSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormTopic = ({ className }) => {
    const [topics, setTopics] = useState([]);
    const dispatch = useDispatch();
    const formTopic = useSelector(selectFormTopic);

    useEffect(() => {
        const getData = async () => {
            const result = await getAllFormTopics();
            setTopics(result.map((i) => i.topicName));
        };
        getData();
    }, []);
    return (
        <select
            value={formTopic}
            onChange={(e) => dispatch(updateFormTopic(e.target.value))}
            name="topic"
            id="topic"
            className={`rounded bg-background h-7 bg-opacity-50 text-xs border-[1px] focus:ring-0 border-slate-500 dark:border-gray-600 hover:text-primary ${className}`}
        >
            {topics.map((t) => (
                <option key={t} value={t}>
                    {t}
                </option>
            ))}
        </select>
    );
};

export default FormTopic;
