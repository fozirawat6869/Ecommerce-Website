
import React, { useState, useEffect } from "react";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";

const images = [img1, img2, img3, img4];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="bg-gray-100 relative">

    
    <div className="w-[95%] mx-auto  overflow-hidden rounded-md ">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-700 ease-in-out bg-gray-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
              currentIndex === i ? "bg-gray-800 scale-110" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  </div>
  );
}
