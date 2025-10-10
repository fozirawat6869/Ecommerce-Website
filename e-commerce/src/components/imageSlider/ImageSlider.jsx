
import React, { useState, useEffect } from 'react'
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.png'
import img4 from '../images/img4.png'

const images = [img1, img2, img3, img4]

export default function ImageSlider() {
    
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
   const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length) // loop back 
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full overflow-hidden ">
      {/* Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            className="w-full lg:h-[350px] md:h-[350px] sm:h-[350px] h-[200px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === i ? 'bg-white scale-125' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// import React, { useState, useEffect } from 'react'
// import img1 from '../images/img1.jpg'
// import img2 from '../images/img2.jpg'
// import img3 from '../images/img3.png'
// import img4 from '../images/img4.png'

// const images = [img1, img2, img3, img4]

// export default function ImageSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(prev => {
//         if (prev === images.length - 1) {
//           setDirection(1) // reset direction forward
//           return 0
//         } else {
//           setDirection(1)
//           return prev + 1
//         }
//       })
//     }, 2000)
//     return () => clearInterval(interval)
//   }, [])

//   const handleDotClick = (index) => {
//     setDirection(index > currentIndex ? 1 : -1)
//     setCurrentIndex(index)
//   }

//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Slider */}
//       <div
//         className="flex transition-transform duration-700 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((img, i) => (
//           <img
//             key={i}
//             src={img}
//             alt={`Slide ${i + 1}`}
//             className="w-full lg:h-[500px] md:h-[350px] sm:h-[350px] h-[200px] object-cover flex-shrink-0"
//           />
//         ))}
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
//         {images.map((_, i) => (
//           <span
//             key={i}
//             onClick={() => handleDotClick(i)}
//             className={`w-3 h-3 rounded-full cursor-pointer ${
//               currentIndex === i ? 'bg-white scale-125' : 'bg-gray-400'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }


