import React, { useState } from 'react';
import { assets } from '../assets/assets';
import productsdata from "../data/products";
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const [products] = useState(productsdata);

  return (
    <div>
     
      <section className="relative bg-yellow-500 min-h-screen flex flex-col md:flex-row items-center px-10 md:px-20 py-10">
      
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            ENJOY REFRESHING ICEPOPS
          </h2>
          <p className="text-lg text-black">
            Our Icepops are made with real fruit juice, natural flavors, and zero
            artificial preservatives. Perfect for cooling down on a hot day, each
            Icepop is a burst of flavor packed with vitamins and hydration.
          </p>
        </div>

       
        <div className="w-full md:w-1/2 flex justify-center relative mt-10 md:mt-0">
          <div className="bg-green-500 w-[500px] h-[650px] absolute -top-6 md:right-22 rounded-2xl"></div>
          <img
            src={assets.icepop}
            alt="Icepop Sticks"
            className="relative z-10 h-[600px] w-full rounded max-w-md"
          />
        </div>
      </section>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
