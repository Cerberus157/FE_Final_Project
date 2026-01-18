// ============================================================
// main.tsx
// This is the entry point of your React application.
// It tells React where to render your app in the HTML page,
// and it wraps the app with important providers like:
// - StrictMode (helps catch potential issues during development)
// - BrowserRouter (enables page navigation using URLs)
// ============================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

// Import Bootstrap styles so all components have consistent styling
import "bootstrap/dist/css/bootstrap.min.css";

// ============================================================
// Find the root HTML element where React will attach the app
// - The "!" tells TypeScript we are sure this element exists
// ============================================================
const rootElement = document.getElementById("root")!;

// ============================================================
// Create the React root and render the application
// Everything inside <StrictMode> runs extra checks in development
// BrowserRouter enables navigation between pages using <Link>,
// <Route>, and other routing features.
// ============================================================
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);