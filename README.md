![Next.js](https://img.shields.io/badge/Next.js-15-black)
![NestJS](https://img.shields.io/badge/NestJS-Red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Blue)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38BDF8)
![TypeORM](https://img.shields.io/badge/TypeORM-E83524)

# 🎬 Streamora

Streamora is a full-stack movie streaming web application developed using **Next.js**, **NestJS**, and **PostgreSQL**. It provides users with a modern platform to explore movies, TV shows, anime, and web series, while offering a secure role-based admin panel for content management.

---

# 🔗 Project Links

Live Website: https://streamora-fullstack-movie-app.vercel.app

# 📸 Project Screenshots
<img width="1872" height="902" alt="image" src="https://github.com/user-attachments/assets/fa61e4ba-95cb-4ab1-b3ff-6cb660717f03" />
<img width="1895" height="901" alt="image" src="https://github.com/user-attachments/assets/8798bf6e-da97-4034-8fee-73ae38e0c428" />
<img width="632" height="805" alt="image" src="https://github.com/user-attachments/assets/e44473cd-33c2-4722-9a56-d8d2467ae29f" />
<img width="622" height="626" alt="image" src="https://github.com/user-attachments/assets/b4ca77be-7640-4308-a6ab-4f8342d083ce" />
<img width="622" height="735" alt="image" src="https://github.com/user-attachments/assets/b0f9f774-ca3a-4197-b4d0-c811c8d0abcc" />

# ✨ Features

## User Features

- Browse Movies
- Browse TV Shows
- Browse Anime
- Browse Web Series
- Search Movies
- Movie Details Page
- Responsive Design
- Modern UI
- Watch Trailer
- Category Filtering

---

## Admin Panel

The admin dashboard allows administrators to manage the platform efficiently.

### Super Admin

The Super Admin has complete control over the system.

Permissions include:

- Add Movies
- Update Movies
- Delete Movies
- View Movies
- Create New Admin
- Update Admin
- Delete Admin
- Manage Admin Roles

---

### Admin

A Normal Admin has limited permissions.

Permissions include:

- Add Movies
- Update Movies
- Delete Movies
- View Movies

Admin users **cannot**:

- Create Admins
- Update Admins
- Delete Admins
- Change Roles

Only the **Super Admin** is authorized to manage administrator accounts.

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Swiper
- React Icons

---

## Backend

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- REST API

---

## Database

- PostgreSQL
- pgAdmin 4

---

# 📂 Project Structure

```
STREAMORA
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   ├── lib
│   └── ...
│
├── backend
│   ├── src
│   ├── movies
│   ├── admin
│   ├── database
│   └── ...
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/streamora.git

cd streamora
```

---

# ⚙ Backend Setup

```bash
cd backend

npm install
```

Configure your PostgreSQL database inside the environment configuration.

Run Backend

```bash
npm run start:dev
```

Backend runs on

```
http://localhost:3000
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install
```

Run Frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:3001
```

(or the port shown in your terminal)

---

# 🗄 Database

This project uses

- PostgreSQL
- pgAdmin 4

Import the database or create the required tables before running the project.

---

# 🔐 Authentication & Authorization

This project uses a custom **Admin Key-based authentication** system for administrator actions.

## Login Process

- An administrator logs in using their email and password.
- After successful login, the backend generates an **Admin Key**.
- The Admin Key must be included in all protected requests.

## Admin Key

The generated Admin Key is required to perform authorized operations such as:

- Add Movies
- Update Movies
- Delete Movies
- Access Admin Dashboard
- Manage Movies

Requests without a valid Admin Key are rejected.

---

## Role-Based Access

### Super Admin

The Super Admin has full access to the system.

Permissions:

- Add Movies
- Update Movies
- Delete Movies
- View Movies
- Create New Admin
- Update Admin
- Delete Admin
- Assign Roles

### Admin

A Normal Admin can only manage movie-related data.

Permissions:

- Add Movies
- Update Movies
- Delete Movies
- View Movies

Restrictions:

- Cannot Create Admins
- Cannot Update Admins
- Cannot Delete Admins
- Cannot Assign Roles

Only the **Super Admin** can manage administrator accounts.

# 📡 API

Example Endpoints

```
POST   /admin/login

POST   /admin/create

GET    /movies

GET    /movies/:id

POST   /movies

PATCH  /movies/:id

DELETE /movies/:id
```

# 🌟 Future Improvements

- JWT Authentication
- User Accounts
- Watch History
- Streaming Integration
- Dark/Light Theme
- Reviews & Ratings

---

# 👩‍💻 Author

**Areeba Sultan**

BS Software Engineering

Superior University Lahore

LinkedIn:
https://www.linkedin.com/in/areeba-sultan-01929b353/

---
