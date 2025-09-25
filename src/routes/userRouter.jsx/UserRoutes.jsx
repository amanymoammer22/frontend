import { Route, Routes } from 'react-router-dom'
import MainLayout from '../../layouts/userLayout/MainLayout';
import ContactSection from "../../pages/userPages/ContactSection";
import About from "../../pages/userPages/about/About";
import Home from "../../pages/userPages/home/Home";
import Cart from '../../pages/userPages/Cart';
import Login from "../../pages/loginPage/Login";
import Register from "../../pages/loginPage/Register";
import Forgotpass from "../../pages/loginPage/Forgotpass";
import ResetPass from "../../pages/loginPage/ResetPass";
import ProtectedRoutes from '../../components/Auth/ProtectedRoutes';
import { authStore } from '../../store/authStore';
import Article from "../../pages/userPages/Article";
import Product from "../../pages/userPages/products/Product";
import Wishlist from "../../pages/userPages/Wishlist";
import ProductsByCategory from "../../pages/userPages/products/ProductsByCategory";
import NotFound from '../../pages/NotFound';
import ProtectedUserRoute from '../../components/Auth/ProtectedUserRoute';
export default function UserRoutes() {

    const { isLoggedIn } = authStore();
    
  return (
      <Routes>
          <Route path="/" element={
              <ProtectedUserRoute>
                  <MainLayout/>
              </ProtectedUserRoute>
          }>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="/products/category/:categoryId" element={<ProductsByCategory />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<ContactSection />} />
              <Route path="article" element={<Article />} />
              <Route
                  path="cart"
                  element={
                      <ProtectedRoutes isLoggedIn={isLoggedIn} redirectTo={"/login"}>
                          <Cart />
                      </ProtectedRoutes>
                  }
              />
              <Route
                  path="wishlist"
                  element={
                      <ProtectedRoutes isLoggedIn={isLoggedIn} redirectTo={"/login"}>
                          <Wishlist />
                      </ProtectedRoutes>
                  }
              />
              <Route
                  path="login"
                  element={
                      <ProtectedRoutes isLoggedIn={!isLoggedIn} redirectTo={"/"}>
                          <Login />
                      </ProtectedRoutes>
                  }
              />
              <Route path="register" element={<Register />} />
              <Route path="forgotpass" element={<Forgotpass />} />
              <Route path="resetPass" element={<ResetPass />} />
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
  );
}