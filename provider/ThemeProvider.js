import { ThemeProvider } from "next-themes";

export const AppThemeProvider = ({ children, ...props }) => {
    return <ThemeProvider {...props}>{children}</ThemeProvider>;
};
