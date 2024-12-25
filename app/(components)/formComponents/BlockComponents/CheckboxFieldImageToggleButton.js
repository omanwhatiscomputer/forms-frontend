/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";

import { FiImage } from "react-icons/fi";
import { LuImageOff } from "react-icons/lu";
import { useDispatch } from "react-redux";
import ImageUploadOnCheckboxToggle from "./ImageUploadOnCheckboxToggle";

const CheckboxFieldImageToggleButton = ({
    className,
    blockId,
    checkboxId,
    type,
    includesImage = false,
    title = "Modal",
    action,
}) => {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <ImageUploadOnCheckboxToggle
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={title}
                action={action}
                blockId={blockId}
                checkboxId={checkboxId}
            />

            <button
                className={`text-2xl text-foreground bg-slate-200 dark:bg-gray-900 p-1 rounded-sm hover:bg-slate-300 hover:dark:bg-gray-800 hover:text-primary ml-[7px] ${className}`}
                type={type}
                {...(!includesImage
                    ? { onClick: () => setOpenModal(true) }
                    : {
                          onClick: () =>
                              dispatch(
                                  action({
                                      id: blockId,
                                      cbId: checkboxId,
                                      value: false,
                                      url: "",
                                  })
                              ),
                      })}
            >
                {includesImage ? <LuImageOff /> : <FiImage />}
            </button>
        </>
    );
};

export default CheckboxFieldImageToggleButton;
