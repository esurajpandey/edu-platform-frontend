import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const COLOR_UTILITY_PREFIX =
  "(?:bg|text|border|from|to|via|ring|stroke|fill|outline|decoration|caret|accent)";
const TAILWIND_DEFAULT_COLOR =
  "(?:black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-[0-9]{2,3})?";
const SEMANTIC_COLOR =
  "(?:transparent|current|inherit|primary|primaryDark|primaryLight|base|surface|surfaceSoft|text|textLight|textMuted|danger)(?:\\/[0-9]{1,3})?";
const DEFAULT_COLOR_CLASS_RE = new RegExp(
  `\\b${COLOR_UTILITY_PREFIX}-${TAILWIND_DEFAULT_COLOR}\\b`,
);
const ARBITRARY_COLOR_CLASS_RE = new RegExp(
  `\\b${COLOR_UTILITY_PREFIX}-\\[(?:#|rgb|hsl|oklch)[^\\]]*\\]`,
);
const UNKNOWN_COLOR_UTILITY_RE = new RegExp(
  `\\b(?:bg|from|to|via|ring|stroke|fill|outline|decoration|caret|accent)-(?!(?:${SEMANTIC_COLOR})\\b)[A-Za-z][A-Za-z0-9-]*(?:\\/[0-9]{1,3})?\\b`,
);

const tailwindColorRestrictionPlugin = {
  rules: {
    "no-random-tailwind-colors": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Disallow default Tailwind/random color values and enforce semantic project colors.",
        },
      },
      create(context) {
        function getClassValueNode(attributeValue) {
          if (!attributeValue) {
            return [];
          }

          if (attributeValue.type === "Literal" && typeof attributeValue.value === "string") {
            return [attributeValue];
          }

          if (
            attributeValue.type === "JSXExpressionContainer" &&
            attributeValue.expression.type === "TemplateLiteral"
          ) {
            return attributeValue.expression.quasis;
          }

          if (
            attributeValue.type === "JSXExpressionContainer" &&
            attributeValue.expression.type === "Literal" &&
            typeof attributeValue.expression.value === "string"
          ) {
            return [attributeValue.expression];
          }

          return [];
        }

        function getTextFromNode(node) {
          if (node.type === "TemplateElement") {
            return node.value.raw;
          }

          if (typeof node.value === "string") {
            return node.value;
          }

          return "";
        }

        return {
          JSXAttribute(node) {
            if (node.name.type !== "JSXIdentifier" || node.name.name !== "className") {
              return;
            }

            const classValueNodes = getClassValueNode(node.value);

            for (const classValueNode of classValueNodes) {
              const classText = getTextFromNode(classValueNode);

              if (
                ARBITRARY_COLOR_CLASS_RE.test(classText) ||
                DEFAULT_COLOR_CLASS_RE.test(classText) ||
                UNKNOWN_COLOR_UTILITY_RE.test(classText)
              ) {
                context.report({
                  node: classValueNode,
                  message:
                    "Use semantic colors defined in src/app/globals.css @theme only.",
                });
              }
            }
          },
        };
      },
    },
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "tailwind-restrict": tailwindColorRestrictionPlugin,
    },
    rules: {
      "tailwind-restrict/no-random-tailwind-colors": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-debugger": "error",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
