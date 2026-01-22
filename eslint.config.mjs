import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Next.js rules apply to client package
  {
    files: ["packages/client/**/*.{js,jsx,ts,tsx}"],
    extends: [...nextVitals, ...nextTs],
  },
  // Global ignores
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.next/**",
    "**/out/**",
    "packages/client/next-env.d.ts",
  ]),
]);

export default eslintConfig;
