/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { MdDragHandle } from "react-icons/md";

const QuestionFieldReorderIcon = ({ dragControls, className }) => {
    return (
        <div
            className={`flex justify-center items-center cursor-move border-t-[1px] border-slate-500 border-dotted hover:text-primary ${className}`}
            onPointerDown={(event) => dragControls.start(event)}
        >
            <MdDragHandle className="text-xl" />
        </div>
    );
};

export default QuestionFieldReorderIcon;
