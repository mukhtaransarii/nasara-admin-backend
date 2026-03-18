# ⚙️ Nasara Admin Backend — Admin API Server

[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)

> The dedicated backend API for the Nasara admin panel. Handles all admin-level operations including product CRUD, order management, and store configuration — separate from the customer-facing API for clean architecture and security.

---

## ✨ Features

- 🔐 **Admin-only JWT Auth** — Separate authentication layer for store admins
- 📦 **Product Control** — Full create, read, update, delete for products
- 🧾 **Order Management** — Update order status, view order history
- 🏪 **Store Config** — Manage store-level settings and details
- 🗄️ **MongoDB** — Clean Mongoose models for all data entities

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT, bcrypt |
| Deployment | Render |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/mukhtaransarii/nasara-admin-backend.git
cd nasara-admin-backend

# Install dependencies
npm install

# Configure environment variables
touch .env
```

Add to `.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_admin_jwt_secret
PORT=5001
```

```bash
# Start the server
node index.js
```

---

## 📁 Related Repositories

| Repo | Description |
|------|-------------|
| [nasara](https://github.com/mukhtaransarii/nasara) | Customer frontend |
| [nasara-backend](https://github.com/mukhtaransarii/nasara-backend) | Customer API server |
| [nasara-admin-frontend](https://github.com/mukhtaransarii/nasara-admin-frontend) | Admin dashboard UI |

---

## 👤 Author

**Mukhtar Alam** — Full Stack Developer  
[Portfolio](https://mukhtaralam.vercel.app) · [GitHub](https://github.com/mukhtaransarii) · [LinkedIn](https://linkedin.com/in/iibbs)
