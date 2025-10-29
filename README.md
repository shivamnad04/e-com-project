🛒 E-Com Cart — Full Stack Application

A complete E-Commerce Cart System built with Node.js, Express.js, MongoDB, and React.js (Vite).
It provides a smooth shopping experience — from browsing products to checkout and generating receipts.

🚀 Project Overview

E-Com Cart is a demo full-stack project that demonstrates:

Product listing and cart management

Checkout process with user details

Dynamic receipt generation and PDF download

RESTful API integration between backend and frontend

📁 Folder Structure
E-Com-Cart/
 ├── backend/
 │   ├── server.js
 │   ├── models/
 │   │    ├── product.js
 │   │    └── cartItem.js
 │   ├── controllers/
 │   │    ├── productController.js
 │   │    ├── cartController.js
 │   │    └── checkoutController.js
 │   ├── routers/
 │   │    ├── productRouter.js
 │   │    ├── cartRouter.js
 │   │    └── checkoutRouter.js
 │   ├── package.json
 │
 ├── frontend/
 │   ├── src/
 │   │    ├── components/
 │   │    │    ├── ProductList.jsx
 │   │    │    ├── Cart.jsx
 │   │    │    ├── Checkout.jsx
 │   │    │    └── ReceiptModal.jsx
 │   │    ├── App.jsx
 │   │    ├── index.js
 │   │    └── api.js
 │   ├── package.json
 │
 └── README.md

🖥️ Backend — E-Com Cart API

The backend provides a RESTful API for managing products, cart operations, and checkout.
It uses Node.js, Express.js, and MongoDB (mock or local).

⚙️ Installation & Setup
# Clone repository
git clone <repository-url>
cd backend

# Install dependencies
npm install

# Run server
npm start

# Server running at:
http://localhost:5000

📘 API Endpoints
1. GET /api/products

Fetch all available mock products.

Example Request:

GET /api/products


Example Response:

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

2. POST /api/cart

Add a product to the cart (or update quantity if already present).

Request Body:

{
  "productId": 1,
  "qty": 2
}


Response:

{
  "message": "Added to cart"
}

3. GET /api/cart

Retrieve all cart items with total price.

Response:

{
  "items": [
    {
      "_id": "690273586081e64f610ff071",
      "productId": 2,
      "name": "Wireless Earbuds",
      "price": 1599,
      "qty": 1,
      "subtotal": 1599
    }
  ],
  "total": 1599
}

4. DELETE /api/cart/:id

Remove a product from the cart by its ID.

Example:

DELETE /api/cart/1


Response:

{
  "message": "Item removed"
}

5. POST /api/checkout

Simulate a checkout process and generate a mock receipt.

Response:

{
  "message": "Checkout successful",
  "receipt": {
    "total": 1599,
    "timestamp": "2025-10-29T20:10:58.409Z",
    "cart": [
      {
        "name": "Wireless Earbuds",
        "price": 1599,
        "qty": 1
      }
    ]
  }
}

🗃️ Database (MongoDB)
Product Schema
{
  _id: ObjectId,
  id: Number,
  name: String,
  price: Number,
  description: String
}

CartItem Schema
{
  _id: ObjectId,
  productId: Number,
  name: String,
  price: Number,
  qty: Number,
  subtotal: Number
}

🧰 Technologies Used

Node.js

Express.js

MongoDB (Mock / Local)

CORS

Body-parser / JSON middleware

💻 Frontend — E-Com Cart UI

The frontend is built with React.js (Vite) and provides a clean, responsive shopping interface.

⚙️ Installation & Setup
cd frontend
npm install
npm run dev


Access the app:

http://localhost:5173

🧩 Features

Fetch products from backend API

Add or remove items from the cart

Dynamic cart badge counter

Checkout form for customer details

Receipt with product details and total

Download receipt as PDF

Modern responsive UI (Tailwind CSS)

🔗 API Integration
Method	Endpoint	Description
GET	/api/products	Fetch all products
POST	/api/cart	Add a product to the cart
GET	/api/cart	Fetch cart items & total
DELETE	/api/cart/:id	Remove cart item
POST	/api/checkout	Checkout & get receipt
⚛️ Tech Stack

React.js (Vite)

Tailwind CSS

Axios

jsPDF & jspdf-autotable

React Router

🧱 Key Components
ProductList.jsx

Displays product grid fetched from backend with “Add to Cart” functionality.

Cart.jsx

Shows all cart items, total amount, and options to remove/update quantities.

Checkout.jsx

Form to collect user info and initiate checkout.

ReceiptModal.jsx

Displays a professional digital receipt and allows PDF download.

🧭 Example User Flow

User visits / → views all products

Adds desired items to the cart

Opens /cart → reviews and updates quantities

Proceeds to /checkout → fills in user details

Submits checkout → receipt modal appears

User can download PDF or close receipt to return home

🪄 License

MIT © 2025 — E-Com Cart Full Stack



