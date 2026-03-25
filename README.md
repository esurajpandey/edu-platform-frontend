# 🎓 Edu Platform – Frontend

Frontend application for the **Edu Platform**, a scalable school management system designed to handle multiple user roles such as **Students, School Admins, and System Administrators**.

This project is built using **Next.js** and focuses on performance, scalability, and clean architecture suitable for production-grade applications.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (recommended)
- **State Management:** Context API / Zustand (optional)
- **Styling:** Tailwind CSS
- **API Communication:** Axios / Fetch API
- **Authentication:** JWT / Session-based (via backend)

---

## 📂 Project Structure

```
edu-platform-frontend/
│
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (auth)/        # Login / Signup routes
│   │   ├── dashboard/     # Role-based dashboards
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/        # Reusable UI components
│   ├── services/          # API calls
│   ├── store/             # State management
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Helper functions
│   └── types/             # TypeScript types
│
├── .env.local             # Environment variables
├── next.config.js
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/edu-platform-frontend.git
cd edu-platform-frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Run the development server

```
npm run dev
```

App will be running at:

```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

---

## 👥 Roles Supported

- 👨‍🎓 Student
- 🏫 School Admin
- 🛠️ System Admin

Each role will have **separate dashboards and permissions**, managed via backend-driven access control.

---

## 🔄 API Integration

All API calls are handled inside:

```
src/services/
```

Example:

```js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default api;
```

---

## 🧠 Key Features (Planned)

- 🔐 Authentication & Authorization (RBAC)
- 📊 Role-based dashboards
- 🏫 School & student management
- 📅 Scheduling & attendance
- 💰 Fees & reports
- ⚡ Optimized performance with SSR/ISR

---

## 🧪 Scripts

```
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Lint code
```

---

## 📌 Future Improvements

- Add unit & integration tests
- Setup CI/CD pipeline
- Implement global error handling
- Improve accessibility (a11y)

---

## 🤝 Contributing

Pull requests are welcome. Please follow proper branch naming and PR guidelines.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Note

This project is part of a full-stack system:

- Backend repository: `edu-platform-backend` (to be linked)

---
