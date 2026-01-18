Shopping App (React + TypeScript + Vite)
    A polished, modular shopping application built with React, TypeScript, Vite, and React Bootstrap. This project demonstrates clean architecture, reusable components, and production‑ready UI patterns. It includes CRUD operations, routing, state management, and a fully functional shopping cart — all implemented with clarity and scalability in mind.

Tech Stack
    https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
    https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
    https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E
    https://img.shields.io/badge/License-MIT-green?style=for-the-badge

Table of Contents
- Overview
- Features
- Screenshots
- Architecture Overview
- Project Structure
- Why I Built This
- Key Learnings
- Future Improvements
- Getting Started
- Appendix: Vite Template Information

Overview
    This application is designed as a portfolio‑quality demonstration of modern front‑end engineering. It highlights your ability to build scalable, maintainable, and user‑friendly interfaces using React and TypeScript.

Features
- Clean, modular architecture
- Reusable components with strong TypeScript typing
- CRUD operations for product management
- Fully functional shopping cart with quantity controls
- Responsive grid layout and polished UI interactions
- Image fallback handling and search highlighting
- Sticky order summary for improved UX

Architecture Overview
| Area        | Purpose                            | 
----------------------------------------------------
| components/ | Reusable UI building blocks        | 
| pages/      | Full‑page views used by the router | 
| types/      | Strong TypeScript interfaces       | 
| App.tsx     | Routing + top‑level state          | 
| main.tsx    | Application entry point            | 
| App.css     | Global styles + animations         | 
----------------------------------------------------

Project Structure
    src/
      components/
        cart/
          CartItem.tsx
        products/
          ProductCard.tsx
          ProductForm.tsx
          ProductList.tsx
      pages/
        HomePage.tsx
        ProductCreatePage.tsx
        ProductEditPage.tsx
        CartPage.tsx
      types/
        Product.ts
        CartItem.ts
      App.tsx
      main.tsx
      App.css

Why I Built This
    This project demonstrates your ability to design thoughtful UI, manage complex state, and structure a scalable React application. It also reflects your commitment to clean code, maintainability, and user‑centered design.

Key Learnings
- Strengthened TypeScript proficiency
- Improved architectural planning and modular design
- Enhanced understanding of reusable component patterns
- Experience managing multi‑page routing and state flow

Getting Started
- git clone ([GIT LINK HERE](https://github.com/Cerberus157/FE_Final_Project.git))
- cd shopping-app
- npm install
- npm run dev

Appendix: Vite Template Information

React + TypeScript + Vite
    This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
    Currently, two official plugins are available:
    - @vitejs/plugin-react — uses Babel for Fast Refresh
    - @vitejs/plugin-react-swc — uses SWC for Fast Refresh

React Compiler
    The React Compiler is not enabled in this template because of its impact on dev & build performance.

Expanding the ESLint Configuration
    export default defineConfig([
      globalIgnores(['dist']),
      {
        files: ['**/*.{ts,tsx}'],
        extends: [
          tseslint.configs.recommendedTypeChecked,
          tseslint.configs.strictTypeChecked,
          tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
          parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname,
          },
        },
      },
    ])

React‑Specific Lint Rules
    import reactX from 'eslint-plugin-react-x'
    import reactDom from 'eslint-plugin-react-dom'

    export default defineConfig([
      globalIgnores(['dist']),
      {
        files: ['**/*.{ts,tsx}'],
        extends: [
          reactX.configs['recommended-typescript'],
          reactDom.configs.recommended,
        ],
        languageOptions: {
          parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname,
          },
        },
      },
    ])
