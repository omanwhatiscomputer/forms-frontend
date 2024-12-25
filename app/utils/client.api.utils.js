import { formTopics } from "@/constants/formTopics";
import { emitMessage } from "../(components)/NotificationToaster";
import { parseBodyFromResponseObjectBodyAsReadStream } from "./client.utils";

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
