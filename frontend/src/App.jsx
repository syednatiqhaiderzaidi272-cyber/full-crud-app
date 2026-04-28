import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

export default function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </ThemeProvider>
  );
}
