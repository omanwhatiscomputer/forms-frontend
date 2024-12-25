/* eslint-disable react/react-in-jsx-scope */
"use client";
import TextInput from "@/app/(components)/common/TextInput";
import ButtonPrimary from "./common/ButtonPrimary";
import { emitMessage } from "./NotificationToaster";
import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";
import { validateEmail } from "../utils/client.utils";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/lib/features/general/authSlice";
import { useEffect } from "react";

const RegistrationFields = () => {
    const dispatch = useDispatch();
    const authProps = useSelector((state) => state.auth);
    const router = useRouter();
    const { theme } = useTheme();
    const emptyFieldsInclude = (emptyFields, value) => {
        return emptyFields.some((x) => x.includes(value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        let data = {
            FirstName: formData.get("fname").trim(),
            LastName: formData.get("lname").trim(),
            Email: formData.get("email").trim().toLowerCase(),
            Password: formData.get("password"),
            RePassword: formData.get("repassword"),
        };

        const errors = [];
        const dict = {
            RePassword: "Re-enter Password",
            FirstName: "First Name",
            LastName: "Last Name",
        };
        const emptyFields = Object.keys(data).filter(
            (key) => data[key] === "" || data[key] === null
        );

        if (emptyFields.length > 0) {
            emptyFields.forEach((x) =>
                errors.push(`Required field ${dict[x] || x} is empty!`)
            );
        }
        if (
            !emptyFieldsInclude(emptyFields, "Email") &&
            !validateEmail(data.Email)
        ) {
            errors.push("Email is invalid! Enter a valid email.");
        }
        if (
            !emptyFieldsInclude(emptyFields, "Password") &&
            data.Password !== data.RePassword
        ) {
            errors.push("Passwords do not match!");
        }

        if (errors.length > 0) {
            errors.forEach((x) => emitMessage(x, "error", theme));
            return;
        }

        delete data.RePassword;

        dispatch(register({ ...data, theme }));
    };

    useEffect(() => {
        if (authProps.isSignedIn) {
            router.push("/dashboard");
        }
    }, [authProps.status]);
    return (
        <>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className=" md:flex md:flex-row md:justify-between gap-1 xl:">
                    <TextInput
                        name={"fname"}
                        type={"text"}
                        placeholder={"First name*"}
                        className={"md:w-3/7"}
                    />
                    <TextInput
                        name={"lname"}
                        type={"text"}
                        placeholder={"Last name*"}
                        className={"md:w-3/7"}
                    />
                </div>
                <TextInput
                    name={"email"}
                    type={"text"}
                    placeholder={"Email*"}
                />
                <TextInput
                    name={"password"}
                    type={"password"}
                    placeholder={"Password*"}
                />
                <TextInput
                    name={"repassword"}
                    type={"password"}
                    placeholder={"Re-enter Password*"}
                />
                <div className="flex justify-end mb-4">
                    <ButtonPrimary type={"submit"}>Register</ButtonPrimary>
                </div>
            </form>
        </>
    );
};

export default RegistrationFields;
