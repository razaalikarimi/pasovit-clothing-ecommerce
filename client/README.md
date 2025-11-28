# Pasovit Clothing – MERN E-Commerce Demo

Backend-focused e-commerce web app for a fictional clothing brand **Pasovit Clothing**, built with the **MERN stack**.

The goal of this assignment is to demonstrate backend skills:
secure authentication, product catalog with filters and pagination, persistent shopping cart, mock checkout, order storage in MongoDB, and order confirmation emails using Nodemailer.

---

## Features

### 1. User Accounts & Authentication

- User registration (name, email, password)
- Secure password hashing with **bcrypt**
- **JWT** based authentication
- Protected routes for cart and orders
- Logged-in user info stored in localStorage on the frontend

### 2. Product Catalog

- Seeded catalog with **20+ clothing products**
- Each product has:
  - `name`, `description`, `price`, `imageUrl`
  - `category` (`Men`, `Women`, `Kids`)
  - available `sizes` (`S`, `M`, `L`, `XL`)
- Public product listing and product detail view

### 3. Search, Filters & Pagination

- Search by product **name / description**
- Filters:
  - Category (`Men / Women / Kids`)
  - Size (`S / M / L / XL`)
  - Price range (`minPrice`, `maxPrice`)
- Filters are **composable** – they can be combined together
- Pagination using query params: `?page=1&limit=8`

### 4. Shopping Cart

- Add product to cart with **selected size** and quantity
- Update quantity / remove item
- **Cart is stored per user** in MongoDB
- Guest users can also add to cart (cart stored in localStorage until login)

### 5. Checkout & Orders

- Mock checkout (no real payment integration)
- Order contains:
  - user reference
  - items (product, size, quantity, price)
  - total price
  - order date/time
- Orders saved in MongoDB and viewable by the user

### 6. Order Confirmation Email

- After successful checkout:
  - Email is sent using **Nodemailer**
  - Includes order summary (products, sizes, quantities, total)
  - Order ID & order date
- Email settings are configurable via environment variables

---

## Tech Stack

**Backend**

- Node.js
- Express.js
- MongoDB & Mongoose
- bcrypt
- JSON Web Tokens (JWT)
- Nodemailer
- dotenv
- cors
- morgan (logging)

**Frontend**

- React (Vite)
- React Router DOM
- Axios
- LocalStorage for auth + guest cart
- Custom CSS (single `index.css`) for a clean, dark theme UI

---

## Project Structure

```bash
pasovit-clothing-ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   └── orderController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Cart.js
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── seed/
│   │   │   └── seedProducts.js
│   │   ├── utils/
│   │   │   └── sendEmail.js
│   │   └── server.js
│   └── package.json
│
└── client/
    ├── src/
    │   ├── api/
    │   │   └── axiosClient.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProductCard.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── ProductList.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── CartPage.jsx
    │   │   ├── CheckoutPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   └── RegisterPage.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```
