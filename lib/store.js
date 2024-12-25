import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/general/authSlice";
import { formReducer } from "./features/form/formSlice";
import { userReducer } from "./features/general/userSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            form: formReducer,
            user: userReducer,
        },
    });
};
