import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "dist/**",
      "out/**",
      "build/**",
      "node_modules/**",
      ".turbo/**",
      ".vercel/**",
      ".cache/**",
      "*.log",
      ".DS_Store",
      "public/sw.js",
      "public/workbox-*.js",
      "coverage/**",
      ".env*",
      "!.env.example",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
    },
    rules: {
      // Enforce TypeScript best practices
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": ["warn", {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": false,
        "ts-nocheck": false,
        "ts-check": false,
      }],

      // React specific rules
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react/no-unused-prop-types": "warn",
      "react/prop-types": "off", // We use TypeScript for prop validation
      
      // General best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
    },
  },
  {
    // Special rules for Next.js pages and API routes
    files: ["app/**/*.ts", "app/**/*.tsx", "pages/**/*.ts", "pages/**/*.tsx"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off", // Next.js has its own type inference for pages
      "import/no-default-export": "off", // Next.js requires default exports for pages
    },
  },
];

export default eslintConfig;
