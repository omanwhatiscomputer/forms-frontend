/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { MdDragIndicator } from "react-icons/md";
export function CheckboxReorderIcon({ dragControls, className }) {
    return (
        <MdDragIndicator
            className={`cursor-move text-foreground hover:text-primary text-3xl ${className}`}
            onPointerDown={(event) => dragControls.start(event)}
        />
    );
}
