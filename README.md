
# 🔒 SecureVault — Password Manager

A modern, secure, and user-friendly **Password Manager** built using **Next.js**, **TypeScript**, and **MongoDB**.
Generate strong passwords, save them securely, and manage your credentials with ease — all while keeping your data encrypted.

---

## 📹 Demo Video

🎥 *[Add your application demo video link here]*

---

## 🧠 About the Project

**SecureVault** is a password manager that lets users generate, save, and manage passwords securely.
New users can generate passwords instantly, but saving them requires an account — ensuring data is encrypted and accessible only to the user.

### ✨ Key Features

* **Free Password Generator** — Generate strong passwords without signing up.
* **Login/Signup System** — Secure user authentication.
* **Save Passwords** — Store passwords with or without details.
* **Manage Vault** — View, edit, and delete saved passwords in your profile.
* **Client-Side Encryption** — User data is encrypted before being saved to the database.
* **MongoDB Integration** — Robust, scalable backend storage.
* **Responsive UI** — Clean and user-friendly interface built with Next.js + Tailwind CSS.

---

## 📂 Project Structure

```
.
├── app/
│   ├── page.tsx             # Home Page (Password Generator)
│   ├── login/page.tsx       # Login Page
│   ├── signup/page.tsx      # Signup Page
│   ├── profile/page.tsx     # User Vault / Profile Page
│   ├── how-it-works/page.tsx# "How It Works" Page
│   └── api/                 # API Routes (Auth, Vault, etc.)
│
├── components/              # Reusable UI Components
├── lib/                     # Utility and helper functions (encryption, etc.)
├── models/                  # MongoDB Schemas
├── public/                  # Static assets
├── styles/                  # Global and module CSS files
├── .env.local               # Environment variables (not pushed to Git)
├── package.json
└── README.md
```

---

## ⚙️ Tech Stack

| Category             | Technology                                     |
| -------------------- | ---------------------------------------------- |
| **Frontend**         | Next.js (App Router), TypeScript, Tailwind CSS |
| **Backend**          | Node.js (API Routes)                           |
| **Database**         | MongoDB with Mongoose                          |
| **Security**         | JWT Authentication, bcrypt, AES Encryption     |
| **Styling**          | Tailwind CSS                                   |
| **State Management** | React Hooks + Context API                      |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Fork the Repository

Click on the **Fork** button (top-right corner of this page) and clone it to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/securevault.git
cd securevault
```

### 2. Install Dependencies

Make sure you have **Node.js (>= 18)** installed.
Then install the dependencies:

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root of your project.

```
# 🔑 Environment Variables

# Example:
# MONGO_URI = your_mongodb_connection_string
# JWT_SECRET = your_jwt_secret
# ENCRYPTION_SECRET = your_encryption_secret_key
# NEXT_PUBLIC_API_URL = http://localhost:3000/api
```

> 📝 *Replace placeholder values with your actual environment details.*

---

### 4. Run the Development Server

```bash
npm run dev
```

Visit: **[http://localhost:3000](http://localhost:3000)**

---

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🧭 How It Works

### 🔹 1. Generate Passwords

Users can instantly generate strong passwords with custom options:

* Choose length
* Include numbers and symbols

No login required for generation.

### 🔹 2. Save Passwords

Login or sign up to save your passwords:

* **Save Without Details:** Store passwords directly.
* **Save With Details:** Add website URL, username, and notes.

### 🔹 3. Manage Vault

View, edit, or delete saved passwords securely in your profile section.

### 🔹 4. Security

All saved details are **encrypted before storing** in MongoDB, ensuring full privacy.

---

## 🔐 Security Highlights

* **AES Encryption:** Encrypts all sensitive user data.
* **bcrypt:** Hashes user passwords before storing them.
* **JWT Authentication:** Secures routes and user sessions.
* **Environment Variables:** Used for secrets and keys (never exposed).

---

## 🧑‍💻 Developer Guide

<!-- ### Running Lint and Type Check -->

<!-- ```bash
npm run lint
npm run type-check
``` -->

<!-- ### Formatting Code

```bash
npm run format
``` -->

---

## 🧱 Folder Overview

| Folder        | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `/app/api`    | Server-side routes for authentication and vault management |
| `/components` | UI components (Navbar, Forms, Buttons, etc.)               |
| `/lib`        | Helper functions (encryption, validation, etc.)            |
| `/models`     | Mongoose schemas for MongoDB collections                   |
| `/styles`     | Global and module styles                                   |

---

## 💬 Contributing

Contributions are welcome!
If you’d like to improve this project:

1. Fork the repo
2. Create a new branch (`feature/your-feature-name`)
3. Commit and push your changes
4. Open a Pull Request

---

## 🧾 License

This project is licensed under the **MIT License** — feel free to use and modify it as you like.

---

## 📧 Contact

For any queries or feedback, feel free to reach out:
**[Your Name]** — [[your.email@example.com](mailto:your.email@example.com)]
LinkedIn: *[your-linkedin-profile]*

---

> © 2025 SecureVault — Built with ❤️ using Next.js, TypeScript & MongoDB.
