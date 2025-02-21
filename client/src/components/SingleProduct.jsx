import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products"; 

const SingleProduct = () => {
  const { id } = useParams(); 
  const product = products.find((p) => p.id === parseInt(id)); 

  
  if (!product) {
    return <h2 className="text-center text-red-600 mt-10">Product not found</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center">
       
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={product.image} alt={product.name} className="h-80 rounded-lg" />
        </div>

       
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-red-600">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl font-bold text-red-600 mt-4">₹{product.price}</p>

          
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-red-700 cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
