import React from "react";
const LocaleInput = () => {
    return (
        <select
            name="locale"
            id="locale"
            className="rounded bg-background h-7 w-[68px] bg-opacity-50 text-xs flex justify-center focus:ring-0 border-0 hover:text-primary"
        >
            <option value="en-US">EN</option>
            <option value="fr-FR">FR</option>
        </select>
    );
};

export default LocaleInput;
