/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { CheckboxReorderIcon } from "../../dragDropComponents/CheckboxReorderIcon";
import { useRaisedShadow } from "../../dragDropComponents/use-raised-shadow";
import CheckboxField from "./CheckboxField";
import { updateCheckboxFieldTextInputByBlockIdCheckboxFieldId } from "@/lib/features/form/formSlice";

const CheckboxDnDItem = ({ co, formId, blockId }) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();
    return (
        <Reorder.Item
            value={co}
            id={co.Id}
            className={"flex w-full"}
            style={{ boxShadow, y }}
            dragListener={false}
            dragControls={dragControls}
        >
            <CheckboxReorderIcon
                dragControls={dragControls}
                className={"translate-y-4"}
            />
            <CheckboxField
                formId={formId}
                key={co.Id + blockId}
                includesImage={co.IncludesImage}
                content={co.Content}
                imageUrl={co.ImageUrl}
                blockId={blockId}
                checkboxId={co.Id}
                action={updateCheckboxFieldTextInputByBlockIdCheckboxFieldId}
            />
        </Reorder.Item>
    );
};

export default CheckboxDnDItem;
