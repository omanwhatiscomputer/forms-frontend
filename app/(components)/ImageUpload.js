/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

/**
 // inside component
    const [openModal, setOpenModal] = useState(false);
 // render:
    (<ImageUpload openModal={openModal} setOpenModal={setOpenModal} />
            <div>
                <button type="button" onClick={() => setOpenModal(true)}>
                    Image upload
                </button>
            </div>)
 */

import { Button, Modal } from "flowbite-react";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { useDispatch } from "react-redux";
import { questionType } from "@/constants/questionType";

const ImageUpload = ({
    setOpenModal,
    openModal,
    title,
    action,
    blockId,
    questionId,
}) => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleChange = async (file) => {
        setFile(file);

        const urlObject = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/uploads",
        });

        dispatch(
            action({
                qId: questionId,
                url: urlObject.url,
                qtype: questionType.image,
                id: blockId,
            })
        );
        setOpenModal(false);
        // console.log(urlObject);
    };

    return (
        <>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <FileUploader
                            className="border-primary"
                            handleChange={handleChange}
                            name="file"
                            types={["JPG", "PNG", "GIF"]}
                            multiple={false}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button color="red" onClick={() => setOpenModal(false)}>
                        Upload
                    </Button> */}
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ImageUpload;