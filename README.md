This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 📚 Libraries Used in the `FlashCardsGUI` Project

A categorized overview of all dependencies and development tools used in the project.

---

## 🧩 Core Framework & Rendering

- **`next`** – React-based web framework for SSR/SSG, App Router
- **`react`** – Core React library
- **`react-dom`** – React DOM-specific methods for rendering components

---

## 🎨 UI & Styling

- **`@mui/material`** – Material UI component library
- **`@mui/material-nextjs`** – Next.js integration layer for MUI (App Router compatible)
- **`@emotion/styled`** – CSS-in-JS styling for React components
- **`@emotion/cache`** – Custom Emotion cache for SSR

---

## 🌐 Internationalization (i18n)

- **`next-intl`** – SSR-compatible i18n library tailored for Next.js App Router
- **`react-i18next`** – Widely-used React i18n library (possibly for legacy support)

---

## 🧾 Forms & Validation

- **`react-hook-form`** – Lightweight and performant form state manager
- **`zod`** – Type-safe schema validation and form integration

---

## 🔁 Data Fetching & APIs

- **`@tanstack/react-query`** – Powerful asynchronous data manager
- **`axios`** – HTTP client for making API requests

---

## 🧪 Testing (Unit & E2E)

### Unit Testing

- **`vitest`** – Fast Vite-native test runner for unit/integration testing
- **`jsdom`** – In-memory DOM implementation for testing
- **`@testing-library/react`** – Test utilities for rendering and querying React components
- **`@testing-library/jest-dom`** – Custom matchers for better test assertions
- **`@types/jest`** – Type definitions for Jest-style assertions

### E2E Testing

- **`cypress`** – End-to-end testing framework for full browser-based flows

---

## ⚙️ TypeScript Support

- **`typescript`** – TypeScript compiler
- **`@types/node`**, **`@types/react`**, **`@types/react-dom`** – Type definitions for Node and React APIs

---

## 🧹 Code Quality & Formatting

- **`eslint`** – Linter for JavaScript/TypeScript code
- **`eslint-config-next`** – Next.js-specific ESLint configuration
- **`eslint-plugin-prettier`** – Integrates Prettier into ESLint rules
- **`eslint-config-prettier`** – Disables ESLint rules that conflict with Prettier
- **`eslint-plugin-simple-import-sort`** – Sorts and groups imports automatically
- **`prettier`** – Code formatter for consistent style across the codebase

---

## 🛠️ Dev Automation & Git Hooks

- **`husky`** – Manage Git hooks (e.g., pre-commit, pre-push)
- **`lint-staged`** – Run linters/formatters only on staged files