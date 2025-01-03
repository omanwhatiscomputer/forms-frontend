/* eslint-disable react/react-in-jsx-scope */
"use client";
import { makeClientGetFormsBySearchTerm } from "@/app/utils/client.api.utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchResults = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const [results, setResults] = useState([]);
    useEffect(() => {
        const getSearchResults = async () => {
            const res = await makeClientGetFormsBySearchTerm(search);

            setResults(res.body);
        };
        getSearchResults();
    }, []);
    return (
        <main className="main">
            <div className="px-4">
                <p className="mb-4">Search Results</p>
                <div className="flex justify-end pr-4 text-gray-600 dark:text-gray-400">
                    <p>Total results: {results.length}</p>
                </div>
                <div className="px-4 w-full border-b-[1px] py-2 border-slate-300 dark:border-gray-700">
                    {results.length > 0 ? (
                        results.map((r) => (
                            <div
                                className="flex flex-col"
                                key={r.formTemplateId}
                            >
                                <p className="font-semibold">{r.title}</p>
                                <p>{r.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No matching results</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default SearchResults;
