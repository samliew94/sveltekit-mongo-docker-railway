/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                background: "#f8fafc",
                primary: "#0f172a",
                secondary: "#64748b",
                error: "#dc2626",
            },
            animation: {
                "spin-fast": "spin 0.5s linear infinite",
            },
        },
    },
    plugins: [],
};
