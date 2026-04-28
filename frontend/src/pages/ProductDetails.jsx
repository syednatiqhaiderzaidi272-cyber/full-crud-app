import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = "/products";
    fetch(`${apiBase}/${id}`)
      .then((r) => r.json())
      .then((data) => { setProduct(data); setLoading(false); });
  }, [id]);

  if (loading) return <div className="center"><div className="spinner" /></div>;
  if (!product) return <div className="center">Product not found.</div>;

  return (
    <div className="page detail-page">
      <button className="btn-back" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back</button>
      <div className="detail-container">
        <div className="detail-imgs">
          <img src={product.thumbnail} alt={product.title} className="detail-main-img" />
          <div className="detail-thumbs">
            {product.images?.slice(0, 4).map((img, i) => (
              <img key={i} src={img} alt="" />
            ))}
          </div>
        </div>
        <div className="detail-info">
          <span className="card-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="price">${product.price} <span className="discount">-{product.discountPercentage}%</span></p>
          <div className="detail-meta">
            <span>⭐ {product.rating}</span>
            <span>📦 Stock: {product.stock}</span>
            <span>🏷️ {product.brand}</span>
          </div>
          <p className="description">{product.description}</p>
          <button className="btn-submit neon-btn" onClick={() => navigate(`/edit/${product.id}`)}>
            <Pencil size={16} /> Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}
