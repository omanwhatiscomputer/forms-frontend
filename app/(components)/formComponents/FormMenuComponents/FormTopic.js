/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { getAllFormTopics } from "@/app/utils/client.api.utils";
import {
    selectFormTopic,
    updateFormTopic,
} from "@/lib/features/form/formSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormTopic = ({ className }) => {
    const [topics, setTopics] = useState([]);
    const { id } = useParams();
    const dispatch = useDispatch();
    const formTopic = useSelector((state) => selectFormTopic(state, id));

    useEffect(() => {
        const getData = async () => {
            const result = await getAllFormTopics();
            setTopics(result.map((i) => i.topicName));
        };
        getData();
    }, []);
    return (
        <div className="flex">
            <div className="h-0 w-0 text-xs flex translate-y-[9px] translate-x-5 pointer-events-none cursor-default">
                Topic:
            </div>
            <select
                value={formTopic}
                onChange={(e) =>
                    dispatch(updateFormTopic({ topic: e.target.value, id: id }))
                }
                name="topic"
                id="topic"
                className={`pl-14 rounded bg-background h-7 bg-opacity-50 border-[1px] focus:ring-0 border-slate-500 dark:border-gray-600 hover:text-primary ${className}`}
            >
                {topics.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormTopic;
