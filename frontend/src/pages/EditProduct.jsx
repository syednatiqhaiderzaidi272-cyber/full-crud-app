import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Save, ArrowLeft } from "lucide-react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct } = useProducts();
  const [form, setForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000/products";
    fetch(`${apiBase}/${id}`)
      .then((r) => r.json())
      .then(({ title, price, description, category, brand, thumbnail, rating, stock }) =>
        setForm({ title, price, description, category, brand: brand || "", thumbnail, rating: rating || 0, stock: stock || 0 })
      );
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await updateProduct(Number(id), { ...form, price: Number(form.price) });
    navigate("/products");
  };

  if (!form) return <div className="center"><div className="spinner" /></div>;

  return (
    <div className="page form-page">
      <button className="btn-back" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back</button>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        {["title", "price", "description", "category", "brand", "thumbnail", "rating", "stock"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {field === "description" ? (
              <textarea name={field} value={form[field]} onChange={handleChange} required />
            ) : (
              <input name={field} type={field === "price" ? "number" : "text"} value={form[field]} onChange={handleChange} required />
            )}
          </div>
        ))}
        <button type="submit" className="btn-submit neon-btn" disabled={submitting}>
          <Save size={18} /> {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
