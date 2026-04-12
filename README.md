# 📚 School Management System (Frontend)

A scalable and production-ready school management system built with Next.js (App Router). This application supports multiple user roles including students, school admins, and system admins.

---

## 🚀 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **React Query (TanStack Query)**
- **SCSS (Sass)**
- **(Optional) Tailwind CSS**
- **Middleware / Proxy for Auth Handling**

---

## 📁 Project Structure

```
/app
  layout.tsx
  page.tsx
  /admin
  /student
  /auth
    login
    signup

/src
  middleware.ts   // Auth + route protection

/components
/styles
  globals.scss
```

---

## 🔐 Features

- 🔑 Authentication (Login / Signup)
- 🧑‍🎓 Student Dashboard
- 🧑‍💼 Admin Dashboard
- 🛡️ Role-based access control
- ⚡ API state management with React Query
- 🎨 Modular styling with SCSS

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```
yarn install
```

### 3. Run development server

```
yarn dev
```

App will be running at:

```
http://localhost:3000
```

---

## 🧠 State Management

We use **React Query** for:

- Server state caching
- API handling
- Background refetching

Configured in:

```
/app/providers.tsx
```

---

## 🔒 Middleware / Proxy

Handles:

- Authentication check
- Route protection
- Redirect logic

Example:

- Unauthenticated users → redirected to `/login`
- Protected routes → `/admin`, `/student`

---

## 🎨 Styling

- Global styles → `globals.scss`
- Component styles → `*.module.scss`
- (Optional) Tailwind for utility-first styling

---

## 📌 Best Practices Followed

- Separation of concerns
- Scalable folder structure
- Client vs Server components handling
- Clean API + UI separation

---

## 🚧 Future Improvements

- JWT Authentication integration
- Role-based dynamic routing
- API service layer abstraction
- Form validation (React Hook Form / Zod)
- Testing (Jest / React Testing Library)

---

## 👨‍💻 Author

Suraj Pandey

---

## 📄 License

This project is for learning and development purposes.
