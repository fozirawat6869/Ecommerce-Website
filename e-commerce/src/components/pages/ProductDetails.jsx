

import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ProductDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:8000/api/products/${id}`);
    const productData = res.data.productDetail;
    const imgData = res.data.images;
    return { product: productData, images: imgData };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load product details</p>;

  const { product, images } = data;
  console.log("Product Data:", product);
  console.log("Images Data:", images);

  if (!selectedImage && images.length) setSelectedImage(images[0]);

    const handleReview=async ()=>{
     
       try{
         const res=await axios.post(`http://localhost:8000/api/review`,{
            productId:id,
            review:reviewText
        },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })

        console.log("res of review from API",res)
       }catch{
        console.log("Failed to submit review")
       }
    }

    const getRatingText=()=>{
      // if(rating===0) return "No rating"
      if(rating===1) return "Very Bad"
      if(rating===2) return "Bad"
      if(rating===3) return "Good"
      if(rating===4) return "Very Good"
      if(rating===5) return "Excellent"
    }

  

  return (
    <div className="bg-gray-100 pl-30 pr-30 pt-2 pb-5">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* LEFT SIDE - Images */}
        <div className="bg-white w-full lg:w-1/2 pl-20 pr-20 pt-5 pb-5 flex flex-col items-center gap-5">
          {/* Main Image */}
          {selectedImage && (
            <div className="w-full h-125 border-10 border-gray-200 rounded-2xl overflow-hidden flex justify-center items-center">
              <img
                src={`http://localhost:8000/${selectedImage}`}
                alt="main"
                className="object-contain h-full w-full object-cover"
              />
            </div>
          )}

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3 mt-3 w-full">
            {images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:8000/${img}`}
                alt={`thumb-${index}`}
                className={`h-30 w-full rounded-lg cursor-pointer border-3 ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                } object-cover`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Product Info */}
        <div className="bg-white w-full lg:w-1/2 p-5 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.product_name}</h1>
          <p className="text-gray-700">{product.product_description}</p>
          <p className="text-2xl font-semibold">₹{product.product_price}</p>
           {product.product_attributes && (
  <div className="flex  gap-5 mt-3">
    {Object.entries(product.product_attributes).map(([key, value], index) => (
      <div key={index}>
        <p className="font-semibold mb-1 capitalize">{key}</p>
        <button className="border px-4 py-1 rounded bg-gray-100">
          {value}
        </button>
      </div>
    ))}
  </div>
)}
          <div className="flex items-center gap-2">
            {/* <span className="text-yellow-400">★★★★★</span> */}
            {[1,2,3,4,5].map((star)=>(
              <span key={star}
               onClick={()=>setRating(star)}
               className={star<=rating ? "text-yellow-400 cursor-pointer text-2xl" : "text-gray-300 cursor-pointer text-2xl"}
              >
                ★
              </span>
            ))}
            <span className="text-gray-600">(0 Reviews)</span>
          </div>
          {product.product_quantity>0 ? 
          (<p className="text-green-600 font-semibold">In Stock ({product.product_quantity} left)</p>)
          :(<p className="text-green-600 font-semibold">Not in stock</p>)}

          <div className="flex items-center gap-4 mt-3">
            <button className="border w-10 h-10 text-xl">-</button>
            <span className="text-xl">1</span>
            <button className="border w-10 h-10 text-xl">+</button>
          </div>

          <button className="bg-purple-700 text-white py-3 rounded text-lg mt-3">
            Add to Cart
          </button>

          <div className="mt-6">
           
            <div className="flex gap-5 items-center">
               {/* <div className="flex text-yellow-400 text-2xl mb-2">★★★★★</div> */}
            
            </div>
              <h2 className="text-xl font-semibold mb-2 mt-5">Review this product</h2>
            <textarea
              className="border w-full p-3 h-32 rounded"
              placeholder="Write your review here..."
              onChange={(e)=>setReviewText(e.target.value)}
            ></textarea>
            <button 
             onClick={handleReview}
            className="bg-black text-white px-6 py-2 rounded mt-3">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;