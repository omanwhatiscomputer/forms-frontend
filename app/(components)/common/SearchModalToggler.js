/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import React from "react";

const SearchModalToggler = ({
    searchIsToggled,
    setSearchIsToggled,
    setNavbarIsToggled,
}) => {
    return (
        <button
            onClick={() => {
                setSearchIsToggled((prev) => !prev);
                setNavbarIsToggled(false);
            }}
            className={`text-base bg-background text-foreground rounded size-7 flex items-center justify-center hover:text-primary ${
                searchIsToggled && "text-primary"
            }`}
        >
            <FaSearch />
        </button>
    );
};

export default SearchModalToggler;
