import { postprocessOpts } from "@/constants/misc";
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
    fillProperty(block, "BlockId", block.Id);
    return block;
};

export const postprocess = (
    obj,
    opt,
    targetProps = ["Description", "Content"]
) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (targetProps.includes(key)) {
                if (opt === postprocessOpts.SERIALIZE) {
                    obj[key] = JSON.stringify(obj[key]);
                } else if (opt === postprocessOpts.DESERIALIZE) {
                    obj[key] = JSON.parse(obj[key]);
                }
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
                postprocess(obj[key], opt);
            }
        }
    }
};

// Description || Content

const camelToPascalCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const transformToPascalCase = (
    obj,
    ignoreKeys = ["description", "content"]
) => {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => transformToPascalCase(item, ignoreKeys));
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
        const pascalKey = camelToPascalCase(key);
        acc[pascalKey] = ignoreKeys.includes(key)
            ? value
            : transformToPascalCase(value, ignoreKeys);
        return acc;
    }, {});
};

// Example usage:
/*
const input = {
    userName: "johnDoe",
    contactInfo: {
        phoneNumber: "123-456-7890",
        emailAddress: "john@example.com",
        socialMedia: {
            linkedinProfile: "linkedin.com/john",
            twitterHandle: "@john",
        },
    },
};

const ignoreList = ["socialMedia"];
const transformed = transformToPascalCase(input, ignoreList);
*/
