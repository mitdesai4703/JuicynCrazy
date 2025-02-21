import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { assets } from "../assets/assets";
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AppContent } from "../context/appContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { userData, backendUrl } = useContext(AppContent);
  
  const cartProducts = useSelector((state) => state.cart.products);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLearnDropdownVisible, setIsLearnDropdownVisible] = useState(false);

  const learnDropdownRef = useRef(null);

  const learnItems = [
    { title: "OUR STORY", image: assets.ourstory, link: "#" },
    { title: "CHOMPIANS", image: assets.chompians, link: "#" },
    { title: "BLOG", image: assets.blog, link: "#" },
    { title: "REWARDS", image: assets.reward, link: "#" },
    { title: "RECIPES", image:assets.recipes , link: "#" },
    { title: "OUR MISSION", image:assets.ourmission , link: "#" },
  ];


  const handleClickOutside = useCallback((event) => {
    if (learnDropdownRef.current && !learnDropdownRef.current.contains(event.target)) {
      setIsLearnDropdownVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="bg-red-600 text-white py-4 px-6 md:px-10 flex items-center justify-between relative">
     
      <div className="md:hidden">
        {menuOpen ? (
          <FaTimes className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
        ) : (
          <FaBars className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
        )}
      </div>

  
      <Link to="/" className="absolute right-[700px] transform -translate-x-1/2 text-2xl md:text-3xl font-bold bg-white text-red-600 px-4 py-1">
        JuicyNCrazy
      </Link>

    
      <ul className="hidden md:flex space-x-6 font-bold uppercase ">
        <li><Link to="/shop">Shop</Link></li>
        <li ref={learnDropdownRef} className="relative cursor-pointer z-50">
          <span onClick={() => setIsLearnDropdownVisible(!isLearnDropdownVisible)} className="flex items-center gap-1">
            Learn <span className="text-xs">▼</span>
          </span>
          {isLearnDropdownVisible && (
            <div className="absolute left-0 mt-2 bg-white shadow-md rounded-lg w-[1200px] p-6 grid grid-cols-3 gap-4 text-black">
              <div className="col-span-2 grid grid-cols-3 gap-4">
                {learnItems.map((item, index) => (
                  <a key={index} href={item.link} className="flex flex-col items-center text-center">
                    <img src={item.image} alt={item.title} className="w-full rounded-lg shadow-md" />
                    <span className="mt-2 font-bold text-lg text-black hover:underline">{item.title} &gt;</span>
                  </a>
                ))}
              </div>
              <div className="bg-red-500 text-white p-6 rounded-lg flex flex-col justify-between">
                <img src={assets.stick} alt="Subscription Offer" className="rounded-lg mb-4 " />
                <h3 className="text-2xl font-bold">STICK SOME POWER IN YOUR PANTRY.</h3>
                <p className="text-sm mt-2">
                  Subscribe to something even tastier than our newsletter. Like a party with all your favorite people (except you can eat them).
                </p>
                <button className="bg-white text-red-600 font-bold px-4 py-2 mt-4 rounded-lg">
                  SUBSCRIBE & SAVE
                </button>
              </div>
            </div>
          )}
        </li>
        <li><Link to="/subscribe-save">Subscribe & Save</Link></li>
      </ul>

    
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/where-to-buy">Where to Buy</Link>
        <Link to="/rewards">Rewards</Link>
        <FaSearch className="cursor-pointer text-xl" />
        
      
        <div className="relative">
          <FaShoppingCart className="cursor-pointer text-xl" />
          <span className="absolute bottom-3 left-3 bg-white text-red-600 text-xs w-4 h-4 flex justify-center items-center rounded-full">
            {cartProducts.length}
          </span>
        </div>

       
        {userData?.name ? (
          <div className="relative z-50">
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-red-800 text-white cursor-pointer " onClick={toggleDropdown}>
              {userData.name[0].toUpperCase()}
            </div>
            {isDropdownVisible && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-lg w-44 text-black">
                <ul className="list-none p-2 text-sm">
                  {userData.role === "admin" ? (
                    <>
                     
                    </>
                  ) : (
                    <li onClick={() => navigate("/profile")} className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Profile</li>
                  )}
                  <li onClick={handleLogout} className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <FaUser className="cursor-pointer text-xl" onClick={() => navigate("/login")} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
