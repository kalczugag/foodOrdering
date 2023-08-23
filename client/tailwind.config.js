/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            spacing: {
                "screen-fit": "calc(100vh - 80px)",
            },
        },
        colors: {
            "red-main": "#d3401f",
            "gray-main": "#222022",
            "green-main": "#02787a",
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            gray: colors.slate,
            blue: colors.blue,
            green: colors.emerald,
            purple: colors.violet,
            yellow: colors.amber,
            pink: colors.fuchsia,
        },
    },
    plugins: [],
};
