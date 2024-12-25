/* eslint-disable react/prop-types */
import React from "react";
import { cx, css } from "@emotion/css";

export const Button = React.forwardRef(function Button(
    // eslint-disable-next-line no-unused-vars
    { className, active, reversed, ...props },
    ref
) {
    return (
        <span
            {...props}
            ref={ref}
            className={`hover:text-primary cursor-pointer ${className} ${
                active ? "text-foreground" : "text-[#777]"
            }`}
        />
    );
});

export const Icon = React.forwardRef(function Icon(
    { className, ...props },
    ref
) {
    return (
        <span
            {...props}
            ref={ref}
            className={cx(
                "material-icons",
                className,
                css`
                    vertical-align: text-bottom;
                `
            )}
        />
    );
});

export const Menu = React.forwardRef(function Menu(
    { className, ...props },
    ref
) {
    return (
        <div
            {...props}
            data-test-id="menu"
            ref={ref}
            className={cx(
                className,
                css`
                    & > * {
                        display: inline-block;
                    }
                `
            )}
        />
    );
});

export const Toolbar = React.forwardRef(function Toolbar(
    { className, ...props },
    ref
) {
    return (
        <Menu
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
                    position: relative;
                `
            )}
        />
    );
});
