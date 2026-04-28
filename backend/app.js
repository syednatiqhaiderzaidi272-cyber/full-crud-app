const express = require("express");
const cors = require("cors");
const { getAll, getOne, create, update, remove } = require("./src/controllers/productController");

const app = express();
app.use(cors());
app.use(express.json());

// Direct route handlers
app.get("/products", getAll);
app.get("/products/:id", getOne);
app.post("/products", create);
app.put("/products/:id", update);
app.delete("/products/:id", remove);

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}

module.exports = app;
