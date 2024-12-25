/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react";
import ImageUpload from "../ImageUpload";
import { useDispatch } from "react-redux";
import { questionType } from "@/constants/questionType";

const FormButton = ({
    className,
    type,
    children,
    forImageUpload = false,
    title = "Upload File",
    blockId,
    questionId,
    checkboxId,
    action,
}) => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            {forImageUpload && (
                <ImageUpload
                    blockId={blockId}
                    questionId={questionId}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    title={title}
                    action={action}
                />
            )}
            <button
                className={`${className}`}
                type={type}
                {...(forImageUpload
                    ? { onClick: () => setOpenModal(true) }
                    : {
                          onClick: () =>
                              dispatch(
                                  action({
                                      qId: questionId,
                                      qtype: questionType.text,
                                      id: blockId,
                                      cbId: checkboxId,
                                  })
                              ),
                      })}
            >
                {children}
            </button>
        </>
    );
};

export default FormButton;
