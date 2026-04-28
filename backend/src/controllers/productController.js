const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

let products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 99.99,
    description: "High quality wireless headphones with noise cancellation.",
    category: "electronics",
    brand: "SoundMax",
    thumbnail: "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/thumbnail.png",
    rating: 4.5,
    stock: 20,
  },
  {
    id: 2,
    title: "Running Shoes",
    price: 59.99,
    description: "Lightweight and comfortable running shoes for all terrains.",
    category: "footwear",
    brand: "SpeedFit",
    thumbnail: "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/thumbnail.png",
    rating: 4.2,
    stock: 35,
  },
];

let nextId = 3;

const getAll = (req, res) => {
  res.json(products);
};

const getOne = (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

const create = async (req, res) => {
  const { title, price, description, category, brand, thumbnail, rating, stock } = req.body;

  // Salt the product title as a unique integrity hash
  const titleHash = await bcrypt.hash(title, SALT_ROUNDS);

  const product = {
    id: nextId++,
    title,
    price: Number(price),
    description,
    category,
    brand,
    thumbnail,
    rating: Number(rating) || 0,
    stock: Number(stock) || 0,
    titleHash,
  };

  products.push(product);
  res.status(201).json(product);
};

const update = async (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const updated = { ...products[index], ...req.body, id: products[index].id };

  // Re-salt if title changed
  if (req.body.title && req.body.title !== products[index].title) {
    updated.titleHash = await bcrypt.hash(req.body.title, SALT_ROUNDS);
  }

  products[index] = updated;
  res.json(products[index]);
};

const remove = (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Product not found" });
  products.splice(index, 1);
  res.json({ message: "Product deleted" });
};

module.exports = { getAll, getOne, create, update, remove };
