/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import FormBlockReorderIcon from "../dragDropComponents/FormBlockReorderIcon";
import { useRaisedShadow } from "../dragDropComponents/use-raised-shadow";
import FormBlock from "./FormBlock";
import BlockHeader from "./BlockComponents/BlockHeader";
import BlockBody from "./BlockComponents/BlockBody";

const FormBlockDnDItem = ({ block, idx, activeBlock, setActiveBlock }) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();
    return (
        <Reorder.Item
            value={block}
            id={block.Id}
            className=""
            style={{ boxShadow, y }}
            dragListener={false}
            dragControls={dragControls}
        >
            <FormBlockReorderIcon
                idx={idx}
                dragControls={dragControls}
                className={
                    "mt-4 bg-primary rounded-r-lg w-[150px] max-w-[165px]"
                }
            />
            <FormBlock
                key={block.Id}
                blockId={block.Id}
                activeBlock={activeBlock}
                setActiveBlock={setActiveBlock}
                displayMenu
            >
                <BlockHeader blockId={block.Id} />
                <BlockBody blockId={block.Id} />
            </FormBlock>
        </Reorder.Item>
    );
};

export default FormBlockDnDItem;
