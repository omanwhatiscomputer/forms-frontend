/* eslint-disable react/react-in-jsx-scope */
"use client";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

// eslint-disable-next-line no-unused-vars

export const ToasterContainer = () => {
    const { theme } = useTheme();
    return (
        <ToastContainer
            stacked={true}
            position={"bottom-right"}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme}
            transition={Flip}
        />
    );
};
/**
 *
 * @param {info | success | warning | error} messageType
 */
export const emitMessage = (message, messageType, theme) => {
    const getEmitterConfig = () => {
        return {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme,
            transition: Flip,
        };
    };
    switch (messageType) {
        case "info":
            toast.info(message, getEmitterConfig());
            break;
        case "success":
            toast.success(message, getEmitterConfig());
            break;
        case "warning":
            toast.warning(message, getEmitterConfig());
            break;
        case "error":
            toast.error(message, getEmitterConfig());
            break;
        default:
            toast(message, getEmitterConfig());
            break;
    }
};
