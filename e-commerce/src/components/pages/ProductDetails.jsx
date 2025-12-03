
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/products/${id}`);
//         setProduct(res.data.productDetail);
//         setLoading(false);
//       } catch (err) {
//         console.log("Error fetching product details:", err);
//         setError("Failed to load product details");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <p className="text-center py-10">Loading...</p>;
//   if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

//   return (
//     <main className="flex flex-col md:flex-row gap-8 bg-gray-100 p-8">
//       {/* Product Image */}
//       <div className="md:w-1/2 bg-white p-5 flex justify-center items-center">
//         <img
//           src={product.main_image}
//           alt={product.name}
//           className="w-full h-full object-cover rounded"
//         />
//       </div>

//       {/* Product Details */}
//       <div className="md:w-1/2 bg-white p-5 flex flex-col gap-4">
//         <h1 className="text-3xl font-bold">{product.name}</h1>
//         <p className="text-gray-700">{product.description}</p>
//         <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
//         <p className="text-gray-500">Category: {product.category}</p>
//         <p className="text-gray-500">Stock: {product.stock}</p>

//         {/* Add to Cart Button */}
//         <button className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600">
//           Add to Cart
//         </button>
//       </div>
//     </main>
//   );
// }

// export default ProductDetails;




import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        const data = res.data.productDetail;

        setProduct(data);
        setSelectedImage(data.main_image);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <main className="px-10 bg-gray-100 py-3">
    <div className="p-8 bg-white flex gap-14 justify-center ">
       
      
      {/* LEFT SIDE (Main Image + Extra Images Below) */}
      <div className="flex flex-col items-center gap-6 justify-center ">

        {/* MAIN IMAGE */}
        <div className="w-[420px] h-[420px] border-gray-100 border-6 rounded-lg shadow flex justify-center items-center">
          <img
            src={selectedImage}
            alt="product"
            className="h-full object-contain rounded"
          />
        </div>

        {/* EXTRA IMAGES (4 Columns in One Row) */}
        <div className="grid grid-cols-4 gap-4 w-[420px]">
          {[product.main_image, ...(product.images || [])]
            .slice(0, 4)
            .map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                className={`w-24 h-24 object-cover border rounded cursor-pointer
                ${selectedImage === img ? "border-purple-600" : "border-gray-300"}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
        </div>
      </div>

      {/* RIGHT SIDE (Product Info) */}
      <div className="w-1/3 flex flex-col gap-4 justify-center border-6 border-gray-100 p-5">

        {/* PRODUCT NAME */}
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {/* DESCRIPTION */}
        <h1 className="text-lg font-bold">{product.description}</h1>

        {/* PRICE */}
        <p className="text-2xl text-gray-800 font-semibold">₹{product.price}</p>

        {/* RATING */}
        <div className="flex text-yellow-400 text-2xl">★★★★★</div>
        <p className="text-gray-600">(0 Reviews)</p>

        {/* STOCK */}
        <p className="text-green-600 font-semibold">
          In Stock ({product.stock} available)
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <button className="border w-10 h-10 text-xl">-</button>
          <span className="text-xl">1</span>
          <button className="border w-10 h-10 text-xl">+</button>
        </div>

        {/* Add to Cart */}
        <button className="bg-purple-700 text-white py-3 rounded text-lg">
          Add to Cart
        </button>

        {/* Review Section */}
        <h2 className="text-xl font-semibold mt-4">Write a Review</h2>

        <div className="flex text-yellow-400 text-2xl mb-2">★★★★★</div>

        <textarea
          className="border w-full p-3 h-32 rounded"
          placeholder="Write your review here..."
        ></textarea>

        <button className="bg-black text-white px-6 py-2 rounded mt-3">
          Submit Review
        </button>
      </div>

    </div>
    </main>
  );
}

export default ProductDetails;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedImage, setSelectedImage] = useState("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/products/${id}`);
//         const data = res.data.productDetail;

//         setProduct(data);
//         setSelectedImage(data.main_image);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load product details");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <p className="text-center py-10">Loading...</p>;
//   if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

//   return (
//     <main className="p-10 bg-white flex gap-10">

//       {/* LEFT: VERTICAL SMALL IMAGES */}
//       <div className="flex flex-col gap-4">
//         {[product.main_image, ...(product.images || [])].map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt="thumb"
//             className={`w-24 h-24 object-cover border rounded cursor-pointer 
//               ${selectedImage === img ? "border-purple-600" : "border-gray-300"}`}
//             onClick={() => setSelectedImage(img)}
//           />
//         ))}
//       </div>

//       {/* CENTER: BIG MAIN IMAGE */}
//       <div className="flex-1 flex justify-center items-center">
//         <div className="w-full h-[550px] border rounded-lg flex justify-center items-center">
//           <img
//             src={selectedImage}
//             alt="product"
//             className="h-full object-contain rounded"
//           />
//         </div>
//       </div>

//       {/* RIGHT: PRODUCT DETAILS */}
//       <div className="w-1/3 flex flex-col gap-4">

//         <h1 className="text-3xl font-bold">{product.name}</h1>

//         <p className="text-2xl text-gray-700 font-semibold">₹{product.price}</p>

//         <div className="flex text-yellow-400 text-2xl">
//           ★★★★★
//         </div>

//         <p className="text-gray-600">(0 Reviews)</p>

//         <p className="text-green-600 font-semibold">
//           In Stock ({product.stock} available)
//         </p>

//         {/* Quantity Row */}
//         <div className="flex items-center gap-4 mt-3">
//           <button className="border w-10 h-10 text-xl">-</button>
//           <span className="text-xl">1</span>
//           <button className="border w-10 h-10 text-xl">+</button>
//         </div>

//         <button className="bg-purple-700 text-white py-3 rounded text-lg mt-4">
//           Add to Cart
//         </button>

//         {/* Review */}
//         <h2 className="text-xl font-semibold mt-6">Write a Review</h2>

//         <div className="flex text-yellow-400 text-2xl mb-2">
//           ★★★★★
//         </div>

//         <textarea
//           className="border w-full p-3 h-32 rounded"
//           placeholder="Write your review here..."
//         ></textarea>

//         <button className="bg-black text-white px-6 py-2 rounded mt-3">
//           Submit Review
//         </button>
//       </div>

//     </main>
//   );
// }

// export default ProductDetails;


