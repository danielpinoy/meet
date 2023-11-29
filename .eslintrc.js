module.exports = {
    extends: ["react-app"],
    overrides: [
        {
            files: ["**/*.test.js"],
            rules: {
                "testing-library/no-node-access": "off",
            },
        },
    ],
};
