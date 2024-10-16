import jest from "eslint-plugin-jest";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("plugin:jest/recommended", "eslint:recommended"), 
    {ignores: ["test", "src/demo", "*.config.*"]},
    {
    plugins: {
        jest,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        "no-unused-vars": "warn",
        "no-var": "warn",
        "no-console": "off",
        "func-names": "off",
        "comma-dangle": ["warn", "only-multiline"],

        quotes: [1, "single", {
            allowTemplateLiterals: true,
            avoidEscape: true,
        }],

        camelcase: "error",
    },
}];