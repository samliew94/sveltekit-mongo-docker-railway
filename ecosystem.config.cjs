module.exports = {
    apps: [
        {
            name: "mmta",
            script: "./build/index.js",
            watch: true,
            env_production: {
                ORIGIN: "http://localhost:3000",
                HOST: "localhost",
                PORT: 3000,
                NODE_ENV: "production",
            },
        },
    ],
};
