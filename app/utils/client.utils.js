import { v4 as uuidv4 } from "uuid";

export const parseBodyFromResponseObjectBodyAsReadStream = async (
    responseObject
) => {
    const reader = responseObject.body.getReader();
    const decoder = new TextDecoder();

    let result = await reader.read();
    return JSON.parse(decoder.decode(result.value));
};

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function fillProperty(obj, propName, value) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (key === propName) {
                obj[key] = value;
                obj["Id"] = uuidv4();
            } else if (
                typeof obj[key] === "object" &&
                obj[key] !== null &&
                key !== "Content"
            ) {
                fillProperty(obj[key], propName, value);
            }
        }
    }
}

export const duplicateBlock = (block) => {
    block.Id = uuidv4();
    fillProperty(block, "blockId", block.Id);
    return block;
};
