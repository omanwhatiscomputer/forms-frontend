import { NextResponse } from "next/server";

const publicPaths = [
    "/register",
    "/signin",
    "/latest",
    "/popular",
    "/viewform",
];
const strictlyPublicPaths = ["/register", "/signin"];

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    return NextResponse.next();
    // const isAuthorized = await authorize(request);
    // if (!isAuthorized && includesPath(request, publicPaths)) {
    //     return NextResponse.next();
    // }
    // if (isAuthorized && includesPath(request, strictlyPublicPaths)) {
    //     return NextResponse.redirect(new URL("/", request.url));
    // }
    // if (isAuthorized) {
    //     return NextResponse.next();
    // }
    // if (request.nextUrl.pathname === "/") return NextResponse.next();

    // return NextResponse.redirect(new URL("/", request.url));
}

const includesPath = (request, paths) => {
    return paths.some((path) => request.nextUrl.pathname.startsWith(path));
};

const authorize = async (request) => {
    const jwt = request.cookies.get("jwt");
    const userId = request.cookies.get("userId");

    if (!jwt && !userId) {
        return false;
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt?.value}`,
    };

    const url =
        process.env.NEXT_PUBLIC_DOTNET_BACKEND_API_BASE_URL +
        `/api/user/${userId?.value}`;
    const options = {
        method: "GET",
        headers: headers,
        credentials: "include",
    };

    const apiResponse = await fetch(url, options);

    if (!apiResponse.ok) {
        return false;
    }

    const result = await apiResponse.json();
    if (result.accountStatus === "Blocked") {
        return false;
    }

    return true;
};

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/register",
        "/signin",
        "/latest",
        "/popular",
        "/dashboard/:path*",
        "/form/:path*",
        "/myforms/:path*",
        "/response/:path*",
    ],
};
