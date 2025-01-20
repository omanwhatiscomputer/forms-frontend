/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const flowbite = require("flowbite-react/tailwind");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./constants/**/*.{js,ts,jsx,tsx,mdx}",
        flowbite.content(),
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
            },
        },
    },
    plugins: [
        flowbite.plugin(),
        require("@tailwindcss/forms")({
            strategy: "className",
        }),
        // plugin(function ({ addVariant }) {
        //     addVariant("neon", ".neon &"); // similar to light/dark in class names
        // }),                                  // usage neon:border-b
    ],
};
