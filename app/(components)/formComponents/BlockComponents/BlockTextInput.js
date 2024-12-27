/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";

/* eslint-disable react/react-in-jsx-scope */

const BlockTextInput = ({
    name,
    type,
    placeholder,
    className,
    value,
    action,
    blockId,
    checkboxId,
    formId,
}) => {
    const dispatch = useDispatch();
    return (
        <input
            value={value}
            onChange={(e) =>
                dispatch(
                    action({
                        id: formId,
                        bId: blockId,
                        cbId: checkboxId,
                        value: e.target.value,
                    })
                )
            }
            name={name}
            type={type}
            placeholder={placeholder}
            className={`border-[1px] caret-primary focus:border-primary bg-background w-full pl-4 mb-1 focus:outline-none focus:ring-0 ${className}`}
        />
    );
};

export default BlockTextInput;
