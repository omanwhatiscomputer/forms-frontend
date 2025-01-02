/* eslint-disable react/prop-types */

import { responseMode } from "@/constants/responseMode";
import Image from "next/image";

/* eslint-disable react/react-in-jsx-scope */
const CheckboxSingle = ({
    value,
    handleChange,
    checkboxOptions,
    mode,
    isRequired,
}) => {
    return (
        <div>
            <div className="w-full flex justify-between text-slate-400 dark:text-gray-600 pt-2 text-sm">
                <div>
                    <p>(Choose one answer)</p>
                </div>
                <div>
                    <p>{isRequired ? "*Required" : "Optional"}</p>
                </div>
            </div>
            {checkboxOptions.map((co) => (
                <div key={co.Id} className="flex items-center my-4">
                    <input
                        {...(mode === responseMode.readonly && {
                            disabled: true,
                        })}
                        className="cursor-pointer"
                        value={co.Id}
                        checked={co.Id === value}
                        onChange={(e) => handleChange(e)}
                        type="checkbox"
                        id={co.Id}
                    />
                    <label htmlFor={co.Id} className="pl-4 py-1 cursor-pointer">
                        <div>
                            <div>{co.Content}</div>
                        </div>
                        {co.IncludesImage && (
                            <div className="flex justify-center">
                                <Image
                                    src={co.ImageUrl}
                                    width={400}
                                    height={400}
                                    className="w-[500px]"
                                    alt="Image"
                                />
                            </div>
                        )}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxSingle;
