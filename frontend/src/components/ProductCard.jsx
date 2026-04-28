import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductCard({ product }) {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${product.title}"?`)) deleteProduct(product.id);
  };

  return (
    <div className="card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="card-img-wrap">
        <img src={product.thumbnail} alt={product.title} />
        <div className="card-overlay">View Details</div>
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <div className="card-rating">{"⭐".repeat(Math.round(product.rating))} <span>{product.rating}</span></div>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button className="btn-edit" onClick={() => navigate(`/edit/${product.id}`)}>
            <Pencil size={15} /> Edit
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            <Trash2 size={15} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
