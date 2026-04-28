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
  {
    id: 3,
    title: "Smartphone Pro Max",
    price: 999.99,
    description: "Latest flagship smartphone with 200MP camera and 5000mAh battery.",
    category: "electronics",
    brand: "TechVision",
    thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro/thumbnail.png",
    rating: 4.8,
    stock: 15,
  },
  {
    id: 4,
    title: "Gaming Laptop",
    price: 1499.99,
    description: "High performance gaming laptop with RTX 4070 and 32GB RAM.",
    category: "computers",
    brand: "GameForce",
    thumbnail: "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Duo%2015/thumbnail.png",
    rating: 4.7,
    stock: 10,
  },
  {
    id: 5,
    title: "Leather Wallet",
    price: 29.99,
    description: "Slim genuine leather wallet with RFID blocking technology.",
    category: "accessories",
    brand: "LuxCraft",
    thumbnail: "https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/thumbnail.png",
    rating: 4.3,
    stock: 50,
  },
  {
    id: 6,
    title: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB mechanical keyboard with Cherry MX switches for gaming and typing.",
    category: "electronics",
    brand: "KeyMaster",
    thumbnail: "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20IdeaPad%20Flex%205i/thumbnail.png",
    rating: 4.6,
    stock: 25,
  },
  {
    id: 7,
    title: "Yoga Mat",
    price: 39.99,
    description: "Non-slip eco-friendly yoga mat with alignment lines.",
    category: "sports",
    brand: "ZenFit",
    thumbnail: "https://cdn.dummyjson.com/products/images/sports-accessories/Gym%20Gloves/thumbnail.png",
    rating: 4.4,
    stock: 40,
  },
  {
    id: 8,
    title: "Coffee Maker",
    price: 79.99,
    description: "Programmable coffee maker with built-in grinder and thermal carafe.",
    category: "kitchen",
    brand: "BrewMaster",
    thumbnail: "https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/thumbnail.png",
    rating: 4.1,
    stock: 30,
  },
  {
    id: 9,
    title: "Sunglasses",
    price: 49.99,
    description: "Polarized UV400 sunglasses with lightweight titanium frame.",
    category: "accessories",
    brand: "SunStyle",
    thumbnail: "https://cdn.dummyjson.com/products/images/sunglasses/Eyewear%20Glasses/thumbnail.png",
    rating: 4.0,
    stock: 60,
  },
  {
    id: 10,
    title: "Backpack",
    price: 69.99,
    description: "Waterproof 40L backpack with USB charging port and laptop compartment.",
    category: "bags",
    brand: "TrailBlaze",
    thumbnail: "https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Submariner%20Watch/thumbnail.png",
    rating: 4.5,
    stock: 45,
  },
];

let nextId = 11;

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
