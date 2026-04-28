import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { PlusCircle, ArrowLeft } from "lucide-react";

const empty = { title: "", price: "", description: "", category: "", brand: "", thumbnail: "", rating: "", stock: "" };

export default function AddProduct() {
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await addProduct({ ...form, price: Number(form.price) });
    navigate("/products");
  };

  return (
    <div className="page form-page">
      <button className="btn-back" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back</button>
      <h1>Add Product</h1>
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
          <PlusCircle size={18} /> {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
