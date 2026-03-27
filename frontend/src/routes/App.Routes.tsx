import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Crt';
import Wishlist from '../pages/WishList';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Orders from '../pages/Orders';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Categories from '../pages/Categories';
import Success from '../pages/Success';
import AddProduct from '../pages/AddProduct'; // vendor dashboard form
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  const token = localStorage.getItem('authToken'); // check if logged in

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/success" element={<Success />} />

      {/* Vendor Add Product - Protected */}
  <Route path="/add-product" element={<AddProduct />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;