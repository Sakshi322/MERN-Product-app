# 🛒 Micro Marketplace (MERN Product App)

A full-stack **MERN** application that allows users to browse products, view details, and mark items as favorites with secure authentication.

---

## 🚀 Features

* 🔐 User Authentication (Login/Register with JWT)
* 📦 Browse Products with Search & Pagination
* ❤️ Favorite / Unfavorite Products
* 🔍 Product Detail View
* 📱 Responsive UI (Mobile Friendly)
* 🧭 Protected Routes (Only logged-in users can access products)
* ⚡ REST API with Express & MongoDB
* 🎨 Styled using TailwindCSS

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* React Router
* TailwindCSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* REST API Architecture

---

## 📂 Project Structure

```
micro-marketplace/
│
├── backend/                # Express API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── frontend/               # React App
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── api/
│   └── App.jsx
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/MERN-Product-app.git
cd MERN-Product-app
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create `.env` file inside **backend**:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

### 3️⃣ Setup Frontend

```
cd ../frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User registers / logs in
2. Backend returns JWT token
3. Token stored in LocalStorage
4. Axios attaches token to protected API requests
5. Only authenticated users can access products

---

## 📡 API Endpoints

### Auth

```
POST /auth/register
POST /auth/login
```

### Products

```
GET    /products?page=1&search=abc
GET    /products/:id
POST   /products/:id/favorite
DELETE /products/:id/favorite
```

---

## 📱 Responsive Design

The UI adapts for:

* Mobile devices (iPhone SE size supported)
* Tablets
* Desktop

Uses Tailwind responsive utilities like:

```
grid-cols-1 sm:grid-cols-2 md:grid-cols-3
```

---

## 🧪 Sample Test Workflow

1. Register a new user
2. Login
3. Browse product list
4. Search products
5. Open product detail
6. Add to favorites ❤️

---

## ⚠️ Troubleshooting

### Cannot GET /

Backend is API-only. Use:

```
http://localhost:5000/products
```

### MongoDB Not Connecting

Check:

* `.env` file
* Internet connection
* MongoDB Atlas IP whitelist

### Git Push Failed (DNS Issue)

Try:

```
ipconfig /flushdns
```

---

## ✨ Future Improvements

* Add Product Image Upload
* Admin Panel
* Cart / Orders
* Dark Mode
* Unit Testing
* Docker Deployment

---

## 👩‍💻 Author

**Sakshi Chaurasia**

Built as part of MERN assignment to demonstrate:

* Full-stack development
* Authentication handling
* REST API integration
* Responsive UI implementation

---

## 📜 License

This project is for educational/demo purposes.
