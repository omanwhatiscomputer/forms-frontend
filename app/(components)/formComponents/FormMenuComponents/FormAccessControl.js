/* eslint-disable react/prop-types */
import {
    selectFormAccessControl,
    updateFormAccessControl,
} from "@/lib/features/form/formSlice";
import { useDispatch, useSelector } from "react-redux";

/* eslint-disable react/react-in-jsx-scope */
const FormAccessControl = ({ className, formId }) => {
    const dispatch = useDispatch();
    const formAccessControl = useSelector((state) =>
        selectFormAccessControl(state, formId)
    );

    return (
        <div className="flex">
            <div className="text-xs translate-y-[9px] translate-x-[18px] w-0 h-0 overflow-visible z-10 pointer-events-none cursor-default">
                Access:
            </div>
            <select
                value={formAccessControl}
                onChange={(e) =>
                    dispatch(
                        updateFormAccessControl({
                            accessControl: e.target.value,
                            id: formId,
                        })
                    )
                }
                name="access"
                id="access"
                className={`rounded bg-background h-7 pl-16 bg-opacity-50 text-xs border-[1px] focus:ring-0 border-slate-500 dark:border-gray-600 hover:text-primary ${className}`}
            >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
            </select>
        </div>
    );
};

export default FormAccessControl;
