import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { ShoppingBag, DollarSign, Tag, Star, TrendingUp, Package } from "lucide-react";

export default function Dashboard() {
  const { products, loading } = useProducts();
  const navigate = useNavigate();

  if (loading) return <div className="center"><div className="spinner" /></div>;

  const total = products.length;
  const avgPrice = total ? (products.reduce((s, p) => s + p.price, 0) / total).toFixed(2) : 0;
  const maxPrice = total ? Math.max(...products.map((p) => p.price)).toFixed(2) : 0;
  const minPrice = total ? Math.min(...products.map((p) => p.price)).toFixed(2) : 0;
  const avgRating = total ? (products.reduce((s, p) => s + p.rating, 0) / total).toFixed(1) : 0;
  const categories = [...new Set(products.map((p) => p.category))].length;

  const stats = [
    { label: "Total Products", value: total, icon: <ShoppingBag size={28} />, color: "neon-purple" },
    { label: "Avg Price", value: `$${avgPrice}`, icon: <DollarSign size={28} />, color: "neon-blue" },
    { label: "Price Range", value: `$${minPrice} – $${maxPrice}`, icon: <TrendingUp size={28} />, color: "neon-green" },
    { label: "Categories", value: categories, icon: <Tag size={28} />, color: "neon-pink" },
    { label: "Avg Rating", value: `⭐ ${avgRating}`, icon: <Star size={28} />, color: "neon-yellow" },
    { label: "In Stock", value: products.filter((p) => p.stock > 0).length, icon: <Package size={28} />, color: "neon-cyan" },
  ];

  // top 5 by rating
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
  // category breakdown
  const catMap = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const topCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <div className="page">
      <h1 className="dash-title">Dashboard</h1>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-info">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-bottom">
        {/* Top Rated */}
        <div className="dash-section">
          <h2>🏆 Top Rated Products</h2>
          <div className="top-list">
            {topRated.map((p, i) => (
              <div key={p.id} className="top-item" onClick={() => navigate(`/product/${p.id}`)}>
                <span className="top-rank">#{i + 1}</span>
                <img src={p.thumbnail} alt={p.title} />
                <div className="top-info">
                  <p>{p.title}</p>
                  <span>⭐ {p.rating} · ${p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="dash-section">
          <h2>📦 Products by Category</h2>
          <div className="cat-list">
            {topCats.map(([cat, count]) => (
              <div key={cat} className="cat-item">
                <span className="cat-name">{cat}</span>
                <div className="cat-bar-wrap">
                  <div className="cat-bar" style={{ width: `${(count / total) * 100}%` }} />
                </div>
                <span className="cat-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
