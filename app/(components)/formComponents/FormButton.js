/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react";
import ImageUpload from "../ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { questionType } from "@/constants/questionType";
import { useTheme } from "next-themes";
import { selectUserId } from "@/lib/features/general/authSlice";
import { useRouter } from "next/navigation";

const FormButton = ({
    form,
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
    const router = useRouter();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const { theme } = useTheme();
    const userId = useSelector((state) => selectUserId(state));
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
                                      theme: theme,
                                      form: form,
                                      userId: userId,
                                      router: router,
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
