/* eslint-disable react/react-in-jsx-scope */

import { responseMode } from "@/constants/responseMode";

/* eslint-disable react/prop-types */
const TextField = ({ value, handleChange, mode, isRequired }) => {
    return (
        <div>
            <div className="w-full flex justify-end text-slate-400 dark:text-gray-600 pt-2 text-sm">
                <p>{isRequired ? "*Required" : "Optional"}</p>
            </div>
            <input
                {...(mode === responseMode.readonly && { disabled: true })}
                type="text"
                className="w-full bg-background text-foreground"
                value={value}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export default TextField;
