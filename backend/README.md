# Quiz Builder Backend

This is the backend API for the **Quiz Builder** application.
It is built with **Node.js, Express, TypeScript, Prisma, and PostgreSQL**.

---

## **Tech Stack**

* Node.js
* Express.js
* TypeScript
* PostgreSQL (via Docker)
* Prisma ORM
* Supports **pnpm**, **npm**, or **yarn** as package manager

---

## **Getting Started**

### 1. Prerequisites

Make sure you have the following installed:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Node.js](https://nodejs.org/) (v18+ recommended)
* One of the package managers: **pnpm**, **npm**, or **yarn**

---

### 2. Start PostgreSQL with Docker

Run the PostgreSQL container using Docker Compose:

```bash
docker compose up -d
```

This will start a PostgreSQL instance with the following configuration:

* **User:** docker
* **Password:** docker
* **Database:** quizdb
* **Port:** 5432

---

### 3. Install dependencies

Navigate to the backend folder and install dependencies:

#### Using pnpm

```bash
pnpm install
```

#### Using npm

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

---

### 4. Configure environment variables

Create a `.env` file in the `backend` folder and set your database URL:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/quizdb"
```

---

### 6. Start the server

You have two options:

#### a) Production build

#### Using pnpm

```bash
pnpm build
pnpm start
```

#### Using npm

```bash
npm run build
npm start
```

#### Using yarn

```bash
yarn build
yarn start
```

#### b) Development mode (with hot reload)

#### Using pnpm

```bash
pnpm run dev
```

#### Using npm

```bash
npm run dev
```

#### Using yarn

```bash
yarn dev
```

The backend server will run at:

```
http://localhost:3333
```

---

## **API Endpoints**

### 1. Create a quiz

* **POST** `/api/quizzes`
* **Body example**:

```json
{
  "title": "JavaScript Fundamentals Quiz",
  "questions": [
    {
      "type": "BOOLEAN",
      "text": "JavaScript is a dynamically typed language.",
      "options": []
    },
    {
      "type": "INPUT",
      "text": "What keyword is used to declare a constant in JavaScript?",
      "options": []
    },
    {
      "type": "CHECKBOX",
      "text": "Which of the following are JavaScript frameworks?",
      "options": ["React", "Angular", "Laravel", "Vue"]
    }
  ]
}
```

---

### 2. List all quizzes

* **GET** `/api/quizzes`
* **Response example**:

```json
[
  {
    "id": 1,
    "title": "JavaScript Fundamentals Quiz",
    "questionCount": 3
  }
]
```

---

### 3. Get quiz details

* **GET** `/api/quizzes/:id`
* **Response example**:

```json
{
  "id": 1,
  "title": "JavaScript Fundamentals Quiz",
  "createdAt": "2025-08-21T18:45:12.123Z",
  "questions": [
    {
      "id": 1,
      "type": "BOOLEAN",
      "text": "JavaScript is a dynamically typed language.",
      "options": []
    }
  ]
}
```

---

### 4. Delete a quiz

* **DELETE** `/api/quizzes/:id`
* **Response example**:

```json
{
  "message": "Quiz deleted successfully"
}
```

---

## **Notes**

* Validation is handled in the controller using **Zod**.
* Questions can be of three types: `BOOLEAN`, `INPUT`, or `CHECKBOX`.
* CHECKBOX questions require at least 2 options.
