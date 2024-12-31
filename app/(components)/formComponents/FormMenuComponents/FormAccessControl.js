/* eslint-disable react/prop-types */
import { selectFormAccessControl } from "@/lib/features/form/formSlice";
import { useSelector } from "react-redux";
import FormAccessModal from "./FormAccessModal";
import { useState } from "react";

/* eslint-disable react/react-in-jsx-scope */
const FormAccessControl = ({ formId }) => {
    const formAccessControl = useSelector((state) =>
        selectFormAccessControl(state, formId)
    );
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <FormAccessModal
                value={formAccessControl}
                formId={formId}
                setOpenModal={setOpenModal}
                openModal={openModal}
                title="Access Control"
            />
            <button
                onClick={() => setOpenModal(true)}
                className="text-xs border-[1px] rounded-lg border-foreground px-2 hover:bg-slate-300 dark:hover:bg-gray-800 hover:text-primary"
            >
                Access: {formAccessControl}
            </button>
        </>
    );
};

export default FormAccessControl;
