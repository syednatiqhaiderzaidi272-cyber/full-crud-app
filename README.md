# Full CRUD App — Integrated Project

React frontend + Express backend with bcrypt password salting.

## Setup & Run

### Backend
```bash
cd backend
npm install
node app.js
# Runs on http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## API Endpoints

| Method | Route             | Description        |
|--------|-------------------|--------------------|
| GET    | /products         | Get all products   |
| GET    | /products/:id     | Get one product    |
| POST   | /products         | Create product     |
| PUT    | /products/:id     | Update product     |
| DELETE | /products/:id     | Delete product     |

## Bcrypt Salting

When a product is created or its title is updated, `bcrypt.hash(title, 10)` generates a salted hash stored as `titleHash` on the product object. This demonstrates secure hashing with a cost factor of 10.
