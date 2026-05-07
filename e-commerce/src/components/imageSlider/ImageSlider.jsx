

import React, { useState, useEffect, useRef } from "react";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";

const images = [img1, img2, img3, img4];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // preload images
  useEffect(() => {
    images.forEach((img) => {
      const image = new Image();
      image.src = img;
    });
  }, []);

  // auto slide
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  return (
    <div className="bg-gray-100 relative">
      <div className="w-[95%] mx-auto overflow-hidden rounded-md relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px]">

        {/* Images */}
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            decoding="sync"
            draggable="false"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-linear ${
              currentIndex === i ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === i
                  ? "bg-gray-800 scale-110"
                  : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

      </div>
    </div>
  );
}
