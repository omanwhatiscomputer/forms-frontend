"use client";
import React from "react";
import { MdDarkMode } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const handleClick = () => {
        if (theme === "light") setTheme("dark");
        if (theme === "dark") setTheme("light");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="text-xs bg-foreground text-background rounded size-7 animate-pulse" />
        );
    }

    return (
        <button
            className="text-base bg-background text-foreground rounded size-7 flex items-center justify-center bg-opacity-20 hover:text-primary"
            onClick={handleClick}
        >
            {theme === "dark" ? <MdDarkMode /> : <IoSunnySharp />}
        </button>
    );
};
