# 🎓 Edu Platform – Frontend

Frontend application for the **Edu Platform**, a scalable school management system designed to manage **students, schools, and system-level operations** with role-based access.

This project is built using **Next.js** with a focus on clean architecture, maintainability, and production-ready practices.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Context API / Zustand
- **API Layer:** Axios / Fetch
- **Linting & Formatting:** ESLint + Prettier

---

## 📂 Project Structure

```
edu-platform-frontend/
│
├── public/                # Static assets (images, icons, etc.)
├── src/
│   ├── app/               # App router (pages & layouts)
│   │   ├── (auth)/        # Authentication routes (login, signup)
│   │   ├── dashboard/     # Role-based dashboards
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Landing page
│   │
│   ├── components/        # Reusable UI components
│   ├── services/          # API integration layer
│   ├── store/             # Global state
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   ├── constants/         # App-wide constants
│   └── types/             # Type definitions
│
├── .env.local             # Environment variables
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone repository

```
git clone https://github.com/your-username/edu-platform-frontend.git
cd edu-platform-frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Run development server

```
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

---

## 👥 Supported Roles

- 👨‍🎓 Student
- 🏫 School Admin
- 🛠️ System Admin

Access and permissions are controlled via backend-driven **RBAC (Role-Based Access Control)**.

---

## 🔄 API Handling

All API calls are centralized in:

```
src/services/
```

Example setup:

```js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export default api;
```

---

## 🎯 Key Features

- 🔐 Authentication (Login / Signup / Session handling)
- 🧩 Modular and scalable folder structure
- 📊 Role-based dashboards
- ⚡ Optimized rendering (SSR / ISR ready)
- 🔁 Centralized API handling
- 🧠 Clean separation of concerns

---

## 🧪 Available Scripts

```
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Run production build
npm run lint       # Run ESLint
```

---

## 📌 Development Guidelines

- Use **feature-based folder structure** where needed
- Keep components **small and reusable**
- Avoid hardcoding values → use constants/env
- Write meaningful commit messages
- Always create a **feature branch + PR** (no direct push to main)

---
