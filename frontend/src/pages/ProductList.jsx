import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { PlusCircle } from "lucide-react";

export default function ProductList() {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

  if (loading) return <div className="center"><div className="spinner" /></div>;
  if (error) return <div className="center error">{error}</div>;

  return (
    <div className="page">
      <div className="list-header">
        <h1>All Products <span className="count-badge">{products.length}</span></h1>
        <button className="btn-add neon-btn" onClick={() => navigate("/add")}>
          <PlusCircle size={18} /> Add Product
        </button>
      </div>
      <SearchBar />
      {products.length === 0 ? (
        <p className="center">No products found.</p>
      ) : (
        <div className="grid">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
