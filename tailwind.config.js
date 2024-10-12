/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        colors: {
            primary: "#f97c90",
            "navbar-btn": "#f97c9143",
            lightgray: "#ececec",
            lightgray2: "#f6f6f6",
            black: "#000000",
            darkgray: "#242424",
            darkgray2: "#a9a9a9",
            white: "#ffffff",
            pink: "#ffe6ea",
            "pink-dark": "#3e3335",
            pink2: "#fff7f8",
            "pink2-dark": "#292324",
            pink3: "#ffcfd7",
            "pink3-dark": "#6e5a5e",
            backdrop: "#0000009a",
            red: "#ff0000",
            "red-dark": "#9b0000",
            green: "#2ac424",
            "green-dark": "#1a7c16",
        },
        screens: {
            desktop: "1280px",
            phone: "100px",
        },
        extend: {},
    },
    plugins: [],
};
