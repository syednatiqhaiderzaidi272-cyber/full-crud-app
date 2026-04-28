const express = require("express");
const cors = require("cors");
const productRoutes = require("./src/routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", productRoutes);
app.use("/products", productRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}

module.exports = app;
