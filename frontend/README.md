# Quiz Builder Frontend

A React + TypeScript frontend for the **Quiz Builder** application.

---

## Tech Stack

* React 18
* TypeScript
* Vite
* Tailwind CSS 4
* React Hook Form + Zod
* Axios
* React Router DOM

---

## Getting Started

### Prerequisites

Make sure you have one of these package managers installed:

* pnpm
* npm
* yarn

Node.js v18+ is recommended.

---

### Installation

```bash
# Using pnpm
pnpm install

# Using npm
npm install

# Using yarn
yarn install
```

---

### Running the Project

#### Development Mode (Hot Reload)

```bash
# Using pnpm
pnpm run dev

# Using npm
npm run dev

# Using yarn
yarn dev
```

This will start the frontend on `http://localhost:5173`.

#### Production Build

```bash
# Build the project
pnpm run build

# Start the production build
pnpm run start

# npm
npm run build
npm run start

# yarn
yarn build
yarn start
```

---

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components (Home, CreateQuiz, QuizDetails)
│   ├── services/        # API service calls
│   ├── lib/             # Axios instance and helpers
│   ├── types/           # TypeScript types
│   └── main.tsx         # App entry point
├── index.html           # Vite HTML template
└── tailwind.config.js   # Tailwind CSS configuration
```

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:3333/api
```

* `VITE_API_URL`: Base URL for the backend API.

---

## Features

* Create quizzes with multiple question types (BOOLEAN, INPUT, CHECKBOX).
* View all quizzes in a dashboard.
* View quiz details.
* Delete quizzes.
* Fully responsive and modern UI using Tailwind CSS.

---

## Available Scripts

* `dev` - Run the frontend in development mode.
* `build` - Build the project for production.
* `preview` - Serve the production build locally.

---

## Notes

* Ensure the backend is running at the URL defined in `.env` before starting the frontend.
* All forms are validated using React Hook Form + Zod.
* Components are modular for easy reusability and maintainability.
