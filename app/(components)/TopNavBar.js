"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo_light from "@/public/logo-light.png";
import logo_dark from "@/public/logo-dark.png";

import { usePathname } from "next/navigation";

// import { IoIosOutlet } from "react-icons/io";

import { useTheme } from "next-themes";

import NavBarToggler from "./navBarComponents/NavBarToggler";
import Link from "next/link";
import { ThemeToggler } from "./navBarComponents/ThemeToggler";
import SearchModalToggler from "./navBarComponents/SearchModalToggler";
import LocaleInput from "./navBarComponents/LocaleInput";
import SearchModal from "./navBarComponents/SearchModal";
import { handleClientLogout } from "../utils/client.api.utils";
import { useRouter } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";
import { checkAuthStatus, signOut } from "@/lib/features/general/authSlice";

// const getLocalStorageItem = (key) => {
//     if (typeof localStorage === "undefined") {
//         return null;
//     }
//     return localStorage.getItem(key);
// };

const TopNavBar = () => {
    const dispatch = useDispatch();
    const authProps = useSelector((state) => state.auth);

    const router = useRouter();
    const { theme } = useTheme();
    const pathname = usePathname();

    const [isToggled, setIsToggled] = useState(false);
    const [searchIsToggled, setSearchIsToggled] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(null);

    useEffect(() => {
        setCurrentTheme(localStorage.getItem("theme") || theme);
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            dispatch(checkAuthStatus());
        };
        checkAuth();
    }, []);

    // eslint-disable-next-line no-unused-vars
    const display = !authProps.isSignedIn ? "hidden" : "";

    const navItemStyle =
        "py-1 mx-4 md:mx-0 md:py-0 pl-[20px] md:px-[10px] mb-[1px] md:mb-0 rounded-md md:h-full md:rounded-none hover:bg-red-900 hover:text-white md:hover:bg-inherit md:hover:text-red-900";

    useEffect(() => {
        setIsToggled(false);
        setSearchIsToggled(false);
    }, [pathname]);

    return (
        <>
            {isToggled && (
                <div
                    onClick={() => setIsToggled(false)}
                    className="z-10 absolute left-0 top-0 w-screen h-screen overflow-hidden bg-background opacity-85 md:hidden"
                />
            )}
            {searchIsToggled && (
                <SearchModal setSearchIsToggled={setSearchIsToggled} />
            )}
            <nav className="navbar fixed z-20 w-full border-b-[1px] border-slate-600 py-1 flex justify-between pl-[10px] bg-background">
                <div className="flex flex-row py-1">
                    <NavBarToggler
                        isToggled={isToggled}
                        setIsToggled={setIsToggled}
                        setSearchIsToggled={setSearchIsToggled}
                    />
                    <Link className="flex" href="/">
                        {/* <IoIosOutlet className="text-primary mr-1 text-xl" /> */}
                        <Image
                            src={
                                currentTheme === "dark" ? logo_dark : logo_light
                            }
                            width={500}
                            height={200}
                            alt="App logo"
                            className="w-[160px]"
                        />
                    </Link>
                </div>
                <div className="flex">
                    <SearchModalToggler
                        searchIsToggled={searchIsToggled}
                        setSearchIsToggled={setSearchIsToggled}
                        setNavbarIsToggled={setIsToggled}
                    />
                    <ThemeToggler setCurrentTheme={setCurrentTheme} />
                    <LocaleInput />
                    <div
                        className={`absolute w-full top-[36px] py-2 md:py-0 left-0 border-b-[1px] md:border-b-0 md:top-auto md:left-auto md:relative md:w-auto md:flex md:flex-row ${
                            isToggled ? "" : "hidden"
                        } bg-background transition-all`}
                    >
                        {!authProps.isSignedIn ? (
                            <ul className="list-none flex flex-col md:flex-row m-0 p-0">
                                <Link
                                    href="/"
                                    className={`${navItemStyle} ${
                                        pathname === "/" && "text-primary "
                                    }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/signin"
                                    className={`${navItemStyle} ${
                                        pathname === "/signin" && "text-primary"
                                    }`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className={`${navItemStyle} ${
                                        pathname === "/register" &&
                                        "text-primary"
                                    }`}
                                >
                                    Register
                                </Link>
                            </ul>
                        ) : (
                            <ul className="list-none flex flex-col md:flex-row m-0 p-0">
                                <Link
                                    href="/dashboard"
                                    className={`${navItemStyle} ${
                                        pathname === "/dashboard" &&
                                        "text-primary"
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <div
                                    className={`${navItemStyle} hover:cursor-pointer ${
                                        pathname === "/register" &&
                                        "text-primary"
                                    }`}
                                    onClick={() => {
                                        handleClientLogout(theme);
                                        dispatch(signOut());
                                        router.push("/");
                                    }}
                                >
                                    Logout
                                </div>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default TopNavBar;
