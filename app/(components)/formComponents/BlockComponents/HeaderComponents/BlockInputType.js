/* eslint-disable react/prop-types */

import { inputType } from "@/constants/inputType";
import {
    selectBlockInputTypeByBlockId,
    updateBlockInputTypeByBlockId,
} from "@/lib/features/form/formSlice";
import { useDispatch, useSelector } from "react-redux";

/* eslint-disable react/react-in-jsx-scope */
const BlockInputType = ({ name, blockId, formId }) => {
    // console.log(formId, blockId);
    const blockInputType = useSelector((state) =>
        selectBlockInputTypeByBlockId(state, formId, blockId)
    );
    const dispatch = useDispatch();

    return (
        <select
            value={blockInputType}
            onChange={(e) =>
                dispatch(
                    updateBlockInputTypeByBlockId({
                        id: formId,
                        bId: blockId,
                        value: e.target.value,
                    })
                )
            }
            name={name}
            id={name}
            className="rounded bg-background bg-opacity-50 text-xs flex justify-center focus:ring-0 hover:text-primary border-[1px] focus:border-primary"
        >
            {inputType.map((item) => (
                <option value={item} key={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};

export default BlockInputType;
