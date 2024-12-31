/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "../../dragDropComponents/use-raised-shadow";
import QuestionFieldReorderIcon from "../../dragDropComponents/QuestionFieldReorderIcon";
import QuestionField from "./QuestionField";

const QuestionDnDItem = ({ blockId, formId, bq }) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();
    return (
        <Reorder.Item
            value={bq}
            id={bq.Id}
            className=""
            style={{ boxShadow, y }}
            dragListener={false}
            dragControls={dragControls}
        >
            <QuestionFieldReorderIcon
                dragControls={dragControls}
                className={""}
            />
            <QuestionField
                formId={formId}
                key={bq.Id}
                type={bq.Type}
                questionId={bq.Id}
                blockId={blockId}
                content={bq.Content}
            />
        </Reorder.Item>
    );
};

export default QuestionDnDItem;
