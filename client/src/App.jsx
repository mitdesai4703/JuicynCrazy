import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import ShopPage from "./pages/ShopPage";
import SingleProduct from "./components/SingleProduct";
import { AppContextProvider } from "./context/appContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/reset-password", "/email-verify"];

  return (
    <AuthProvider>
    <AppContextProvider>
      <div>
      <ToastContainer/>
        {!hiddenRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<SingleProduct />} />
        </Routes>
        {!hiddenRoutes.includes(location.pathname) && <Footer />}
      </div>
    </AppContextProvider>
  </AuthProvider>
  
  );
}


export default App;
