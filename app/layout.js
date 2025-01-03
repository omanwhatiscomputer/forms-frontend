/* eslint-disable react/prop-types */

import { AppThemeProvider } from "@/provider/ThemeProvider";
import "./globals.css";
import "material-icons/iconfont/material-icons.css";
import React from "react";
import TopNavBar from "./(components)/TopNavBar";
import { ToasterContainer } from "./(components)/NotificationToaster";
import StoreProvider from "@/provider/StoreProvider";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <StoreProvider>
                    <AppThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        themes={["light", "dark"]}
                    >
                        <TopNavBar />
                        {children}
                        <ToasterContainer />
                    </AppThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
