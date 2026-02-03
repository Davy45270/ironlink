import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["**/node_modules/**", "**/dist/**", "services/api-gateway/src/db/migrate.js"] },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: { ...globals.node, ...globals.browser },
    },
  },
  js.configs.recommended,
];
