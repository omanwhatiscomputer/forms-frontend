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

import { Button, Modal, Select } from "flowbite-react";
import { FileUploader } from "react-drag-drop-files";
import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";

const ImageUpload = ({ setOpenModal, openModal }) => {
    const [file, setFile] = useState(null);
    const handleChange = async (file) => {
        setFile(file);

        const url = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/uploads",
        });
        console.log(url);

        // save url to db
    };

    return (
        <>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>Small modal</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={["JPG", "PNG", "GIF"]}
                            multiple={false}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>
                        I accept
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ImageUpload;
