import { createContext, useContext, useEffect, useState } from "react";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/products";
const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BASE);
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const addProduct = async (product) => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    setProducts((prev) => [data, ...prev]);
    return data;
  };

  const updateProduct = async (id, product) => {
    const res = await fetch(`${BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));
    return data;
  };

  const deleteProduct = async (id) => {
    await fetch(`${BASE}/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = searchTerm
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
