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
    formId,
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
                    formId={formId}
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
                                      id: formId,
                                      qId: questionId,
                                      qtype: questionType.text,
                                      bId: blockId,
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
