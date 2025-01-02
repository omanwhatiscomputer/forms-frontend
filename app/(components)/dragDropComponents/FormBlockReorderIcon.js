/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { MdOutlineDragIndicator } from "react-icons/md";

const FormBlockReorderIcon = ({ dragControls, className, idx }) => {
    return (
        <div
            className={`flex items-center select-none py-1 ${className} ${
                dragControls && "cursor-move"
            }`}
            {...(dragControls && {
                onPointerDown: (event) => dragControls.start(event),
            })}
            // onPointerDown={(event) => dragControls.start(event)}
        >
            <MdOutlineDragIndicator className="text-xl text-gray-300 dark:text-background" />
            <p className="font-bold text-gray-200 pl-3">Question #{idx + 1}</p>
        </div>
    );
};

export default FormBlockReorderIcon;
