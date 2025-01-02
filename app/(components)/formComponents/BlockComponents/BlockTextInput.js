/* eslint-disable react/prop-types */

import { formMode } from "@/constants/formMode";
import { selectFormMode } from "@/lib/features/form/formSlice";
import { useDispatch, useSelector } from "react-redux";

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
    const mode = useSelector((state) => selectFormMode(state, formId));
    return (
        <input
            {...((mode === formMode.readonly || mode === formMode.respond) && {
                disabled: true,
            })}
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
            className={`caret-primary focus:border-primary bg-background w-full pl-4 mb-1 focus:outline-none focus:ring-0 ${className} ${
                mode !== formMode.readonly && mode !== formMode.respond
                    ? "border-[1px]"
                    : "border-0"
            }`}
        />
    );
};

export default BlockTextInput;
