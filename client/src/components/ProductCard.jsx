import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/features/cart/cartSlice";
import products from "../data/products";

const ProductCard = ({ product }) => {
  const dispatch =useDispatch();
  const navigate = useNavigate();

  const handledAddToCart = ()=>{
    dispatch(addToCart(product))
  }

  const handleProductClick = () => {
    navigate(`/shop/${product.id}`); 
  };

  return (
    <div onClick={handleProductClick} className="cursor-pointer">
      <div className="bg-white shadow-lg rounded-lg p-4 border border-black relative max-w-sm mx-auto">
        
       
        <div className="flex justify-center">
          <img src={product.image} alt={product.name} className="h-50" />
        </div>

        
        <div className="text-center mt-4 border border-red-400">
          <h3 className="text-xl mr-[150px] text-red-600">{product.name}</h3>
          <div className="-mt-[23px] ml-[240px] flex items-center justify-center">
            <span className="border px-3 py-1 text-xs rounded-lg">
              10 OR 24 PACK
            </span>
          </div>

          
          <p className="text-2xl text-red-600 mt-2">₹{product.price}</p>

        
          <button 
          onClick={(e)=>{
            e.stopPropagation();
            handledAddToCart(product)
          }}
          className="bg-red-600 text-white text-sm cursor-pointer w-[300px] py-2 rounded-lg mt-4 hover:bg-red-700">
            QUICK SHOP
          </button>
          <p className="text-blue-600 text-sm mt-2 cursor-pointer hover:underline">
            VIEW PRODUCT
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
