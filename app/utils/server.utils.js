import { redirect } from "next/navigation";

export const redirectToHomePage = async () => {
    redirect("/");
};
