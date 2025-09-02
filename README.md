# NoteWallet Frontend

NoteWallet is a simple and secure note management application built with React (Vite) for the frontend and a Node.js/Express backend.  
This repository contains the **frontend** code of the project.

---

## 🚀 Features
- User registration and login with OTP verification.
- Secure note creation, editing, and deletion.
- Responsive and clean UI with modern styling.
- Toast notifications for success and error messages.
- Routing support for SPA deployment.

---

## 🛠️ Tech Stack
- **React (Vite)** – frontend framework
- **React Router** – client-side routing
- **Axios** – API calls
- **React Toastify** – toast notifications
- **Tailwind CSS** (if you added styling with it)

---

## 📂 Project Structure
frontend/
│── public/ # Static assets
│── src/ # Source code
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components
│ ├── App.jsx # Main app entry
│ ├── main.jsx # ReactDOM entry
│── package.json # Dependencies and scripts
│── vite.config.js # Vite configuration
│── index.html # HTML template


---

## ⚡ Getting Started

1️⃣ Clone the repository
git clone https://github.com/Sonu-Kumhar/notewallet-frontend.git
cd NoteWallet-frontend

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev

4️⃣ Build for production
npm run build

🔗 Backend Repository : https://github.com/Sonu-Kumhar/notewallet-backend

The backend of this project is available here: NoteWallet Backend

📌 Deployment Notes

If hosting on Render / Vercel / Netlify, ensure:

SPA fallback is enabled (redirect all routes to /index.html).

Correct backend API URL is set in your .env or config file.
✨ Author

Developed by Sonu Kumhar as part of an Internshala Assignment Project.


Do you also want me to prepare a **backend README.md** in the same style so you can submit both together?
