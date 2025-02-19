import { formTopics } from "@/constants/formTopics";
import { emitMessage } from "../(components)/NotificationToaster";
import { parseBodyFromResponseObjectBodyAsReadStream } from "./client.utils";

export const makeClientGetAllPublicFormTemplatesRequest = async () => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/form/public";
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();

        return {
            status: responseObject.status,
            body: data,
        };
    }
    return { status: responseObject.status, body: null };
};
export const makeClientGetAllPrivateFormTemplatesRequest = async () => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/form/private";
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();

        return {
            status: responseObject.status,
            body: data,
        };
    }
    return { status: responseObject.status, body: null };
};
export const makeClientGetAllPrivateFormTemplatesByAuthorizedUserIdRequest =
    async (userId) => {
        const url =
            process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
            "/api/form/private/" +
            userId;
        const headers = {
            "Content-Type": "application/json",
        };
        const options = {
            method: "GET",
            headers: headers,
            credentials: "include",
        };
        const responseObject = await fetch(url, options);
        if (responseObject.ok) {
            const data = await responseObject.json();

            return {
                status: responseObject.status,
                body: data,
            };
        }
        return { status: responseObject.status, body: null };
    };

export const makeClientGetBlockResponseAnalyticsRequest = async (
    formId,
    blockId
) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/formresponse/formresponseanalytics/" +
        `${formId}/${blockId}`;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();

        return {
            status: responseObject.status,
            body: data,
        };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientGetAllFormResponseInfosByFormTemplateId = async (
    formId
) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        `/api/formresponse/allftresponseindexes/${formId}`;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();

        return {
            status: responseObject.status,
            body: data,
        };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientGetUserInfoByIdRequest = async (userId) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/user/useridx/" +
        userId;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: [] };
};

export const makeClientGetFormsBySearchTerm = async (searchTerm) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_SEARCH_API_BASE_URL +
        "/api/search/forms" +
        `?searchTerm=${searchTerm}`;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: [] };
};

export const makeClientGetAllFormsAutocompleteRequest = async (searchTerm) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_SEARCH_API_BASE_URL +
        "/api/autocomplete/forms" +
        `?searchTerm=${searchTerm}`;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: [] };
};

export const makeClientGetAllFormsRequest = async () => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL + "/api/form/all";
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();

        return {
            status: responseObject.status,
            body: data,
        };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientGetAllFormsResponseByFormIdRequest = async (formId) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        `/api/formresponse/allftresponses/${formId}`;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();

        return {
            status: responseObject.status,
            body: data,
        };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientGetAllFormsResponseByRespondentId = async (userId) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        `/api/formresponse/alluserresponses/${userId}`;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();

        return {
            status: responseObject.status,
            body: data,
        };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientGetAllFormsByUserIdRequest = async (userId) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL + "/api/form/all";
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();

        return {
            status: responseObject.status,
            body: data.filter((f) => f.authorId === userId),
        };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientUpdateFormResponseByFormResponseIdRequest = async (
    responseObjectId,
    data
) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/formresponse/" +
        responseObjectId;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientGetFormResponseByFormResponseIdRequest = async (
    responseObjectId
) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/formresponse/" +
        responseObjectId;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientFormResponseSubmissionRequest = async (data) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/formresponse";
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientUpdateFormByFormIdRequest = async (formId, data) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/form/" +
        formId;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientGetFormByFormIdRequest = async (formId) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/form/" +
        formId;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientFormCreationRequest = async (data) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL + "/api/form";
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientGetAllUsersAutocompleteRequest = async (searchTerm) => {
    const url =
        process.env.NEXT_PUBLIC_DOTNET_SEARCH_API_BASE_URL +
        "/api/autocomplete/users" +
        `?searchTerm=${searchTerm}`;
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientRegisterNewUserTagRequest = async (data) => {
    // AuthorID
    // NewTagName

    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL + "/api/tag";
    const headers = {
        "Content-Type": "application/json",
    };
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientAuthStatusCheckRequest = async () => {
    const headers = {
        "Content-Type": "application/json",
    };
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        "/api/auth/status";
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };

    const responseObject = await fetch(url, options);
    if (responseObject.ok) {
        const data = await responseObject.json();
        return { status: responseObject.status, body: data };
    }
    return { status: responseObject.status, body: null };
};

export const makeClientSignUpRequest = async (data, theme) => {
    const headers = {
        "Content-Type": "application/json",
    };
    // "Access-Control-Allow-Headers": "Content-Type, Authorization",
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET, POST, OPTIONS",

    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL + "/api/user";
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        credentials: "include",
    };

    const responseObject = await fetch(url, options);

    if (!responseObject.ok) {
        switch (responseObject.status) {
            case 400:
                emitMessage(
                    "Email address is already registered!",
                    "error",
                    theme
                );
                break;

            default:
                emitMessage(
                    `Sign up failed with status ${responseObject.status}`,
                    "error",
                    theme
                );
                break;
        }

        return;
    }

    let result = await parseBodyFromResponseObjectBodyAsReadStream(
        responseObject
    );

    return { status: responseObject.status, body: result };
};

export const makeClientLogInRequest = async (data, theme) => {
    const headers = {
        "Content-Type": "application/json",
    };
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL + "/api/user";
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        credentials: "include",
    };

    const responseObject = await fetch(url, options);
    if (!responseObject.ok) {
        switch (responseObject.status) {
            case 404:
            case 401:
                emitMessage(
                    "Invalid credentials! Please make sure your email and password are correct.",
                    "error",
                    theme
                );
                break;

            default:
                emitMessage(
                    `Log in failed with status ${responseObject.status}`,
                    "error",
                    theme
                );

                break;
        }

        return;
    }

    let result = await parseBodyFromResponseObjectBodyAsReadStream(
        responseObject
    );

    if (result.accountStatus === 1) {
        emitMessage(
            "Access denied! Your account has been blocked. If you think this was a mistake contact a website administrator.",
            "error",
            theme
        );
    }

    if (data.RememberMe) {
        localStorage.setItem("userId", result.id);
        localStorage.setItem("jwt", result.token);
    }

    return { status: responseObject.status, body: result };
};

export const handleClientLogout = async (theme) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        const url =
            process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
            "/api/user/logout";
        const options = {
            method: "POST",
            headers: headers,
            credentials: "include",
        };
        const res = await fetch(url, options);
        if (!res.ok) {
            emitMessage("Error processing logout request!", "error", theme);
            return;
        }

        localStorage.removeItem("userId");
        localStorage.removeItem("jwt");
        sessionStorage.clear();
        emitMessage("You have been logged out!", "success", theme);
    } catch (err) {
        console.error("Error during logout:", err);
    }
};

export const getAllFormTopics = async () => {
    const headers = {
        "Content-Type": "application/json",
    };
    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL + "/api/topic";
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };
    const responseObject = await fetch(url, options);
    if (!responseObject.ok) {
        return formTopics;
    }
    let result = await parseBodyFromResponseObjectBodyAsReadStream(
        responseObject
    );

    return result;
};
