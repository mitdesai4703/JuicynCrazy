import React from 'react';
import Marquee from 'react-fast-marquee';
import img1 from '../assets/one.png';
import img2 from '../assets/two.png';
import img3 from '../assets/three.png';
import img4 from '../assets/four.png';
import img5 from '../assets/five.png';
import img6 from '../assets/six.png';
import img7 from '../assets/seven.png';
import img8 from '../assets/eight.png';
import img9 from '../assets/nine.png';
import img10 from '../assets/ten.png';

const Banner = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  return (
    <div className="bg-[#d02c2f] py-5">
      <Marquee pauseOnHover speed={50} gradient={false}>
        {images.map((img, index) => (
          <div
            key={index}
            className="mx-6 transition-transform duration-300 hover:scale-110"
          >
            <img
              src={img}
              alt={`Company ${index + 1}`}
              className="h-20 w-auto drop-shadow-lg rounded-lg"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Banner;
