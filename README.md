# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

Personal comments:

1. On package.json, to make it go live, upload the zip files onto vercel after changing "build": "tsc -b && vite build" to "build": "vite build".

2. May try to update the version of vite on the package.json from "vite": "^5.4.11" to the newer:

"devDependencies": {
"@types/node": "^24.13.2",
"@types/react": "^19.2.17",
"@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^6.0.3",
"oxlint": "^1.71.0",
"typescript": "~6.0.2",
"vite": "^8.1.0"
}

This will only work on Vercel as StackBlitz works on a restricted sandbox that is incompatible with the newer version.
