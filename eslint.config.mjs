import js from "@eslint/js";

export default [
  { ignores: ["**/node_modules/**", "**/dist/**", "services/api-gateway/src/db/migrate.js"] },
  js.configs.recommended,
];
