# Saber Regex Dashboard

### Project Setup Instructions

Use Node version 18+: ```nvm use 18```

Clone the repository: https://github.com/aouse/saber.git

Install dependencies: ```npm install```

Run the development server: ```npm run dev```

The app will be available at http://localhost:3000.

Run tests: ```npm run test```

***Note errors can be simulated in the following ways***

#### Invalid Regex:
Try adding a regex pattern that is not valid JavaScript syntax, such as [abc (missing closing bracket).
The form should display an "Invalid regex pattern" error.

#### Empty Fields:
Try submitting the form with either the name or regex field empty.

### Architecture Overview

+ **Routes** include, Home, Dashboard, Dashboard/Edit and Dashboard/Approval modes. Edit and Approval have been given routes to demonstrate routing techniques with the option to deeplink to these sections but could have been handled without. Layouts and the initial data (generated lorem-ipsum) in this case is server component code which provides a skeleton for template mark-up. Most of the logic is client side code, needed for the level of user interactivity to meet the core requirements. 

+ **Features** are the functional areas of the dashboard that implement the core requirements such as the left hand panel and the document text area

+ **Components** describe reusable UI blocks which include, Toggle, Button, List, Dropdown and ContentArea that sit within features.

+ **Custom hooks** (e.g., usePatternsLogic) encapsulate business logic and state management to allow components and features to focus on rendering.

+ **CSS Modules** provide scoped, maintainable styles for each component.

+ **Persistence and state management** Patterns and document(generated text)  state are synced to localStorage for session persistence. Redux Toolkit manages global (local) state, including patterns, approvals, and document text.

+ **Testing** Vitest and Testing Library are used for unit and component tests.

### Assumptions Made During Implementation
+ Regex patterns are stored as plain strings and validated using JavaScript's RegExp constructor.

+ Pattern IDs are generated using timestamps (Date.now().toString()), assuming no concurrent additions.

+ All extracted terms are recalculated whenever the document text or a pattern changes.

+ LocalStorage is used for persistence; no backend or server-side storage is implemented.

+ Accessibility: Efforts have been made to ensure good color contrast and keyboard navigation, but further improvements may be needed for full WCAG compliance.

+ UI/UX: The dashboard is designed for desktop and mobile, but is optimised for modern browsers.

### What I Would Do If I Had More Time
**Advanced Regex** 
Would use a more sophisticated regex function with more error handling. Preventing duplicate patters etc

**Add More Unit Tests**
Increase coverage for all hooks, reducers, and UI components to ensure robust, maintainable code.

**End-to-End Tests**
Set up E2E tests (e.g., with Playwright or Cypress) to verify user flows such as adding, editing, and approving patterns.

**Use TanStack Query**
Integrate TanStack Query to unify local state and persistence, making data fetching, caching, and syncing with localStorage or a backend more reliable and scalable.

**SSR & Data Layer Improvements**
Refactor to fetch patterns and document data from a database via API routes, enabling server-side rendering (SSR) and better scalability.

**Accessibility Enhancements**
Improve ARIA labeling, keyboard navigation, and error messaging—especially in forms—to meet WCAG standards.

**Precommit Hook for Linting & Testing**
Add a precommit hook (using Husky or lint-staged) to automatically run linting and tests before every commit.

**SCSS for Styling**
Migrate from CSS Modules to SCSS for more powerful and maintainable styling, including variables, mixins, and nesting.

**Pattern Filtering & Sorting**
Add UI and logic to filter and sort regex patterns by name, approval status, or number of matches for better usability.

