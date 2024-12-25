import {
    selectFormAccessControl,
    updateFormAccessControl,
} from "@/lib/features/form/formSlice";
import { useDispatch, useSelector } from "react-redux";

/* eslint-disable react/react-in-jsx-scope */
const FormAccessControl = ({ className }) => {
    const dispatch = useDispatch();
    const formAccessControl = useSelector(selectFormAccessControl);

    return (
        <select
            value={formAccessControl}
            onChange={(e) => dispatch(updateFormAccessControl(e.target.value))}
            name="access"
            id="access"
            className={`rounded bg-background h-7  bg-opacity-50 text-xs border-[1px] focus:ring-0 border-slate-500 dark:border-gray-600 hover:text-primary ${className}`}
        >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
        </select>
    );
};

export default FormAccessControl;
