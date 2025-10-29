E-Com Cart (Backend)

This backend provides a simple RESTful API for an e-commerce cart and checkout system.
It is built using Node.js, Express.js, and MongoDB (mock or in-memory for demo).

Folder Structure
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

Installation & Setup
1. Clone Repository
git clone <repository-url>
cd backend

2. Install Dependencies
npm install

3. Run Server
npm start

4. Server Running At
http://localhost:5000

API Endpoints
GET /api/products

Fetch all available mock products.

Example Request

GET /api/products


Example Response

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

POST /api/cart

Add a product to the cart (or update quantity if already present).

Request Body

{
  "productId": 1,
  "qty": 2
}


Example Response

{
    "message": "Added to cart"
}

GET /api/cart

Retrieve all cart items with total price.

Example Request

GET /api/cart


Example Response

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

DELETE /api/cart/:id

Remove a product from the cart by its ID.

Example Request

DELETE /api/cart/1


Example Response

{
    "message": "Item removed"
}

POST /api/checkout

Simulate a checkout process and generate a mock receipt.

Example Request

POST /api/checkout


Example Response

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

Database (MongoDB)
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

Technologies Used

Node.js

Express.js

MongoDB (Mock or local)

CORS

Body-parser / JSON middleware



E-Com Cart (Frontend)

This is the React.js frontend for the E-Com Cart application.
It provides a clean and responsive user interface for browsing products, adding items to the cart, checking out, and viewing a digital receipt.

Folder Structure
frontend/
 ├── src/
 │   ├── components/
 │   │    ├── ProductList.jsx        # Displays products grid with Add to Cart
 │   │    ├── Cart.jsx               # Shows cart items, total, and actions
 │   │    ├── Checkout.jsx           # Checkout form with user details and payment
 │   │    └── ReceiptModal.jsx       # Displays digital bill with download option
 │   ├── App.jsx                     # Routes and main app layout
 │   ├── index.js                    # React entry point
 │   └── api.js                      # Axios instance for backend communication
 ├── package.json

Installation & Setup
1. Navigate to Project
cd frontend

2. Install Dependencies
npm install

3. Run Development Server
npm run dev

4. Access the App
http://localhost:5173

Features

Fetch products from backend API

Add / remove items from the cart

Cart badge updates dynamically when items are added

Checkout form for customer details (name, email, phone, address, payment)

Generate receipt after checkout with product details and total

Download receipt as a PDF file

Responsive, modern UI using Tailwind CSS

API Integration

The frontend interacts with the following backend routes:

Method	Endpoint	Description
GET	/api/products	Fetch all products
POST	/api/cart	Add a product to the cart
GET	/api/cart	Fetch all cart items and total
DELETE	/api/cart/:id	Remove item from cart
POST	/api/checkout	Checkout and get receipt
Tech Stack

React.js (Vite)

Tailwind CSS for styling

Axios for API requests

jsPDF and jspdf-autotable for generating downloadable PDF receipts

React Router for navigation

Key Components Overview
ProductList.jsx

Displays available products fetched from the backend with an “Add to Cart” button for each item.

Cart.jsx

Shows cart items, quantities, total price, and remove/update buttons.

Checkout.jsx

Includes form fields for customer information and triggers receipt generation on submission.

ReceiptModal.jsx

Shows the order summary, customer details, and downloadable PDF receipt.

Example Flow

User visits / to view products.

Adds desired items to cart.

Opens /cart to review and adjust quantities.

Proceeds to /checkout to fill details.

Submits checkout → Receipt modal appears with order summary.

User can download the receipt or close the modal to return home




