# 🛒 E-Com Cart (Full Stack)

This project is a simple full-stack **E-Commerce Cart and Checkout**
system built with **Node.js**, **Express**, **MongoDB (mock)**, and
**React.js**.

------------------------------------------------------------------------

## 🧩 Backend (Node.js + Express)

### Overview

This backend provides a RESTful API for managing products, cart, and
checkout.\
It is designed for simplicity and educational purposes using mock or
in-memory data.

### Folder Structure

    backend/
     ├── server.js
     ├── models/
     │    ├── product.js
     │    └── cartItem.js
     ├── controllers/
     │    ├── productController.js
     │    ├── cartController.js
     │    └── checkoutController.js
     ├── routers/
     │    ├── productRouter.js
     │    ├── cartRouter.js
     │    └── checkoutRouter.js
     ├── package.json

### Installation & Setup

``` bash
git clone <repository-url>
cd backend
npm install
npm start
```

Server runs at → `http://localhost:5000`

------------------------------------------------------------------------

### API Endpoints

#### GET /api/products

Fetch all available mock products.

**Response:**

``` json
[
  {
    "_id": "69026d366efed69ad52083db",
    "id": 1,
    "name": "Vibe T-Shirt",
    "price": 499,
    "description": "Soft cotton T-shirt with minimalist Vibe logo print."
  },
  {
    "_id": "69026d366efed69ad52083dc",
    "id": 2,
    "name": "Wireless Earbuds",
    "price": 1599,
    "description": "Noise-cancelling Bluetooth earbuds with 20-hour battery life."
  }
]
```

#### POST /api/cart

Add a product to the cart (or update quantity).

**Request Body:**

``` json
{ "productId": 1, "qty": 2 }
```

**Response:**

``` json
{ "message": "Added to cart" }
```

#### GET /api/cart

Retrieve all cart items with total price.

**Response:**

``` json
{
  "items": [
    { "productId": 2, "name": "Wireless Earbuds", "price": 1599, "qty": 1, "subtotal": 1599 }
  ],
  "total": 1599
}
```

#### DELETE /api/cart/:id

Remove a product from the cart.

**Response:**

``` json
{ "message": "Item removed" }
```

#### POST /api/checkout

Simulate checkout and generate a receipt.

**Response:**

``` json
{
  "message": "Checkout successful",
  "receipt": {
    "total": 1599,
    "timestamp": "2025-10-29T20:10:58.409Z",
    "cart": [{ "name": "Wireless Earbuds", "price": 1599, "qty": 1 }]
  }
}
```

------------------------------------------------------------------------

### Database Schemas

**Product:**

``` js
{
  id: Number,
  name: String,
  price: Number,
  description: String
}
```

**CartItem:**

``` js
{
  productId: Number,
  name: String,
  price: Number,
  qty: Number,
  subtotal: Number
}
```

### Technologies

-   Node.js
-   Express.js
-   MongoDB (mock/local)
-   CORS
-   Body-parser

------------------------------------------------------------------------

## 🎨 Frontend (React + Tailwind)

### Overview

Responsive and modern UI for browsing products, managing cart, checkout,
and digital receipts.

### Folder Structure

    frontend/
     ├── src/
     │   ├── components/
     │   │    ├── ProductList.jsx
     │   │    ├── Cart.jsx
     │   │    ├── Checkout.jsx
     │   │    └── ReceiptModal.jsx
     │   ├── App.jsx
     │   ├── index.js
     │   └── api.js
     ├── package.json

### Installation & Setup

``` bash
cd frontend
npm install
npm run dev
```

Runs at → `http://localhost:5173`

------------------------------------------------------------------------

### Features

-   Fetch products from backend
-   Add/remove items from cart
-   Dynamic cart badge
-   Checkout form with customer info
-   Generate downloadable PDF receipt
-   Modern UI (Tailwind CSS)
-   Responsive design

------------------------------------------------------------------------

### API Integration

  Method   Endpoint        Description
  -------- --------------- ---------------------
  GET      /api/products   Fetch all products
  POST     /api/cart       Add product to cart
  GET      /api/cart       Fetch cart + total
  DELETE   /api/cart/:id   Remove item
  POST     /api/checkout   Checkout + receipt

------------------------------------------------------------------------

### Key Components

**ProductList.jsx** -- Displays products grid.\
**Cart.jsx** -- Shows cart items and total.\
**Checkout.jsx** -- Form for customer details.\
**ReceiptModal.jsx** -- Digital bill with download option.

------------------------------------------------------------------------

### Example Flow

1.  User visits `/` → sees products.\
2.  Adds items to cart.\
3.  Opens `/cart` → reviews order.\
4.  Proceeds to `/checkout`.\
5.  Submits → sees receipt modal.\
6.  Downloads PDF receipt.

------------------------------------------------------------------------

### Tech Stack

-   React (Vite)
-   Tailwind CSS
-   Axios
-   jsPDF + jspdf-autotable
-   React Router DOM

------------------------------------------------------------------------

© 2025 E-Com Cart \| Full-Stack Demo
