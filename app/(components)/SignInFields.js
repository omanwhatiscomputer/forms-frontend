/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useTheme } from "next-themes";
import TextInput from "@/app/(components)/common/TextInput";
import ButtonPrimary from "./common/ButtonPrimary";
import { emitMessage } from "./NotificationToaster";
import { useRouter } from "next/navigation";
import { validateEmail } from "../utils/client.utils";

import { useDispatch, useSelector } from "react-redux";
import { signIn } from "@/lib/features/general/authSlice";
import { useEffect } from "react";

const SignInFields = () => {
    const dispatch = useDispatch();
    const authProps = useSelector((state) => state.auth);

    const { theme } = useTheme();
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        let data = {
            Email: formData.get("email").trim(),
            Password: formData.get("password"),
        };
        const emptyFields = Object.keys(data).filter(
            (key) => data[key] === "" || data[key] === null
        );
        if (emptyFields.length > 0) {
            emptyFields.forEach((x) =>
                emitMessage(`Input field ${x} is empty!`, "error", theme)
            );
            return;
        }
        if (!validateEmail(data.Email)) {
            emitMessage(
                "Email is invalid! Enter a valid email.",
                "error",
                theme
            );

            return;
        }
        data = { ...data, RememberMe: formData.get("remember") };

        dispatch(signIn({ ...data, theme }));
    };
    useEffect(() => {
        if (authProps.isSignedIn) {
            router.push("/dashboard");
        }
    }, [authProps.status]);
    return (
        <>
            <form onSubmit={(event) => handleSubmit(event)}>
                <TextInput
                    name={"email"}
                    type={"email"}
                    placeholder={"Email"}
                />
                <TextInput
                    name={"password"}
                    type={"password"}
                    placeholder={"Password"}
                />

                <div className="ml-2">
                    <input
                        className="focus:ring-0 focus:border-2 focus:border-primary accent-primary text-primary"
                        name="remember"
                        id="rm"
                        type="checkbox"
                    />
                    <label className="ml-2" htmlFor="rm">
                        Remember Me
                    </label>
                </div>
                <div className="flex justify-end mb-4">
                    <ButtonPrimary type={"submit"}>Sign In</ButtonPrimary>
                </div>
            </form>
        </>
    );
};

export default SignInFields;
