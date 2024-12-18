import React from "react";
// eslint-disable-next-line react/prop-types
const SearchModal = ({ setSearchIsToggled }) => {
    return (
        <>
            <div
                onClick={() => setSearchIsToggled(false)}
                className="absolute z-10 top-0 left-0 w-screen h-screen overflow-hidden flex justify-center items-center opacity-70 bg-background"
            ></div>
            <div className="absolute z-20 left-1/2 top-[15%] transform -translate-x-1/2 -translate-y-1/2">
                <input type="text" />
            </div>
        </>
    );
};

export default SearchModal;
