Pasovit Clothing – MERN E-Commerce Demo
Backend-focused e-commerce web app for a fictional clothing brand Pasovit Clothing, built with the MERN stack.

The goal of this assignment is to demonstrate backend skills: secure authentication, product catalog with filters and pagination, persistent shopping cart, mock checkout, order storage in MongoDB, and order confirmation emails using Nodemailer.

Features
1. User Accounts & Authentication
User registration (name, email, password)
Secure password hashing with bcrypt
JWT based authentication
Protected routes for cart and orders
Logged-in user info stored in localStorage on the frontend
2. Product Catalog
Seeded catalog with 20+ clothing products
Each product has:
name, description, price, imageUrl
category (Men, Women, Kids)
available sizes (S, M, L, XL)
Public product listing and product detail view
3. Search, Filters & Pagination
Search by product name / description
Filters:
Category (Men / Women / Kids)
Size (S / M / L / XL)
Price range (minPrice, maxPrice)
Filters are composable – they can be combined together
Pagination using query params: ?page=1&limit=8
4. Shopping Cart
Add product to cart with selected size and quantity
Update quantity / remove item
Cart is stored per user in MongoDB
Guest users can also add to cart (cart stored in localStorage until login)
5. Checkout & Orders
Mock checkout (no real payment integration)
Order contains:
user reference
items (product, size, quantity, price)
total price
order date/time
Orders saved in MongoDB and viewable by the user
6. Order Confirmation Email
After successful checkout:
Email is sent using Nodemailer
Includes order summary (products, sizes, quantities, total)
Order ID & order date
Email settings are configurable via environment variables
Tech Stack
Backend

Node.js
Express.js
MongoDB & Mongoose
bcrypt
JSON Web Tokens (JWT)
Nodemailer
dotenv
cors
morgan (logging)
Frontend

React (Vite)
React Router DOM
Axios
LocalStorage for auth + guest cart
Custom CSS (single index.css) for a clean, dark theme UI





Getting Started
1. Clone the repository
git clone https://github.com/<your-username>/pasovit-clothing-ecommerce.git
cd pasovit-clothing-ecommerce

2. Install dependencies
Backend
cd backend
npm install

Frontend
cd ../client
npm install

3. Seed demo products

In backend/:

npm run seed


This will:

connect to MongoDB

clear existing products

insert ~20 demo clothing products

4. Run the app in development
Backend (port 5000)
cd backend
npm run dev

Frontend (port 5173)
cd client
npm run dev


Open the app at:

http://localhost:5173

 API Overview (Backend)

Base URL: http://localhost:5000/api

Auth

POST /auth/register

body: { name, email, password }

POST /auth/login

body: { email, password }

Products

GET /products

query params:

page, limit

search

category (Men/Women/Kids)

size (S/M/L/XL)

minPrice, maxPrice

GET /products/:id

Cart (auth required)

GET /cart

POST /cart

{ productId, size, quantity }

PUT /cart/:itemId

{ quantity }

DELETE /cart/:itemId

Orders (auth required)

POST /orders/checkout

Uses current user’s cart, creates order, sends email

GET /orders/my

Returns logged-in user’s orders

 Test Flow

Register a new user from Register page

Login with the same credentials

Browse products, apply search + filters + pagination

Add items to cart (different sizes and quantities)

Go to Cart → update quantities / remove items

Go to Checkout, confirm order

Check:

Order created in MongoDB

Confirmation email received at configured email address
