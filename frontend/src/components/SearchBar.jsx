import { useProducts } from "../context/ProductContext";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useProducts();
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search products by title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
