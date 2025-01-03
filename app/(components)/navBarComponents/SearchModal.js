"use client";
import { makeClientGetAllFormsAutocompleteRequest } from "@/app/utils/client.api.utils";
import { maxNumberOfSuggestions } from "@/constants/misc";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
const SearchModal = ({ setSearchIsToggled }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const getSuggestions = async () => {
            const res = await makeClientGetAllFormsAutocompleteRequest(
                searchTerm
            );

            setResults(res.body);
        };
        if (searchTerm.length > 2) {
            getSuggestions();
        } else {
            setResults([]);
        }
    }, [searchTerm]);

    const filterSuggestions = () => {
        return results.slice(0, maxNumberOfSuggestions);
    };

    const handleSearch = async (event) => {
        if (event.key === "Enter") {
            await router.push(`/searchresults?search=${searchTerm}`);
            setSearchIsToggled(false);
        }
    };

    return (
        <>
            <div
                onClick={() => setSearchIsToggled(false)}
                className="absolute z-10 top-0 left-0 w-screen h-screen overflow-hidden flex justify-center items-center opacity-85 bg-background"
            ></div>
            <div className="absolute z-20 left-1/2 top-[15%] transform -translate-x-1/2 -translate-y-1/2">
                <input
                    onKeyUp={(e) => handleSearch(e)}
                    value={searchTerm}
                    onFocus={() => setIsFocused(true)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search forms..."
                    className="caret-primary text-foreground bg-background rounded-lg focus:ring-0 focus:border-2 focus:border-primary leading-10"
                />
                {isFocused && searchTerm.length > 2 && (
                    <div
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="absolute bg-slate-300 dark:bg-gray-800 w-[218px] flex flex-col"
                    >
                        {filterSuggestions().length > 0 &&
                            results.map((r) => (
                                <button
                                    className="pl-4 w-full hover:bg-primary flex flex-col overflow-hidden hover:text-white text-start py-1"
                                    key={r.title}
                                >
                                    <span className="font-semibold">
                                        {r.title}
                                    </span>
                                    <span className="text-sm">
                                        {r.description}
                                    </span>
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchModal;
