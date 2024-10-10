/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        colors: {
            primary: "#f97c90",
            "navbar-btn": "#f97c9143",
            lightgray: "#ececec",
            black: "#000000",
            darkgray: "#4d4d4d",
            white: "#ffffff",
        },
        screens: {
            desktop: "1280px",
            phone: "100px",
        },
        extend: {},
    },
    plugins: [],
};
