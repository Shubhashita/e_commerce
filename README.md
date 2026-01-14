# LUXE. E-Commerce Platform

A premium full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). This platform features a sleek, responsive design and robust functionality for both customers and administrators.

## 🚀 Key Features

*   **Modern UI/UX**: Built with React and Tailwind CSS for a premium feel.
*   **Product Management**: Full CRUD for administrators (add, update, delete products via Dashboard).
*   **Shopping Cart**: Real-time cart management with quantity updates.
*   **Authentication**: Secure JWT-based authentication for users and administrators.
*   **Search & Filters**: Search products by name/description and filter by categories.
*   **Responsive**: Fully optimized for mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

*   **Frontend**: React, Tailwind CSS, Axios, React Router, Lucide Icons.
*   **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt, Joi.

## 📋 Prerequisites

*   Node.js (v16.0 or higher)
*   MongoDB Atlas account or local MongoDB instance

## ⚙️ Setup Instructions

### 1. Clone the Project
```bash
# Navigate to the project directory
cd e-commerce
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create a .env.local file in the backend directory with:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
ALLOWED_ORIGINS=["http://localhost:3000"]
ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create a .env file in the frontend directory (if needed):
REACT_APP_API_URL=http://localhost:5000
```
Start the frontend application:
```bash
npm start
```

## 🔐 Sample Test Credentials

Use these credentials to test the platform functionality:

### Administrator Account
*   **Email**: `admin@luxe.com`
*   **Password**: `admin123`
*   **Role**: FULL Access (Dashboard, Product Management, View Users)

### Regular User Account
*   **Email**: `user@example.com`
*   **Password**: `user123`
*   **Role**: Customer Access (Browse Shop, Add to Cart, Manage Profile)

---


## 📄 License
This project is licensed under the ISC License.
