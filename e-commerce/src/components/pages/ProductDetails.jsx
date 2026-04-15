

// import axios from "axios";
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";
// import { FiPlusSquare } from "react-icons/fi";
// import { FiMinusSquare } from "react-icons/fi";
// import { FiPlus } from "react-icons/fi";
// import { FiMinus } from "react-icons/fi";



// function ProductDetails() {

//   const queryClient=useQueryClient()


   
//   const token = localStorage.getItem("token");

//   const navigate = useNavigate();

//   const { id } = useParams();
//   const [selectedImage, setSelectedImage] = useState("");
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(0);

//   // 2 reviews at once
//   const [reviewPage, setReviewPage] = useState(1);

//   const [productQuantityForCart,setProductQuantityForCart]=useState(1)

//   const fetchProduct = async () => {
//     const res = await axios.get(
//       `http://localhost:8000/api/products/${id}?reviewPage=${reviewPage}&reviewLimit=2`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }

//     );
//     const productData = res.data.productDetail;
//     const imgData = res.data.images;
//     const review = res.data.reviews;
//     const inCart = res.data.inCart;
//     console.log("product details API res", res.data);

//     return { product: productData, images: imgData, reviews: review, inCart };
//   };

//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ["product", id,reviewPage],
//     queryFn: fetchProduct,
//     cacheTime: 5 * 60 * 1000,
//     staleTime: 5 * 60 * 1000,
//   });

//   if (isLoading) return <p className="text-center py-10">Loading...</p>;
//   if (isError)
//     return (
//       <p className="text-center py-10 text-red-500">
//         Failed to load product details
//       </p>
//     );

//   const { product, images, reviews, inCart } = data;

//   if (!selectedImage && images.length) setSelectedImage(images[0]);

//   const handleReview = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/review`,
//         {
//           productId: id,
//           rating: "",
//           review: reviewText,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (
//         res.data.success === true &&
//         res.data.message === "Review submitted successfully"
//       ) {
//         alert("Review inserted successfully");
//         setReviewText("");
//         refetch();
//         return;
//       }

//       if (
//         res.data.success === true &&
//         res.data.message === "Review updated successfully"
//       ) {
//         alert("Review updated successfully");
//         setReviewText("");
//         refetch();
//         return;
//       }
//     } catch {
//       console.log("Failed to submit review");
//     }
//   };

//   const getRatingText = () => {
//     if (rating === 1) return "Very Bad";
//     if (rating === 2) return "Bad";
//     if (rating === 3) return "Good";
//     if (rating === 4) return "Very Good";
//     if (rating === 5) return "Excellent";
//   };

//   const handleRating = async (star) => {
//     setRating(star);

//     try {
//       await axios.post(
//         `http://localhost:8000/api/review`,
//         {
//           productId: id,
//           rating: star,
//           review: "",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       refetch();
//     } catch {
//       console.log("Failed to submit rating");
//     }
//   };

//   const handleAddToCart=async ()=>{
//       try{
//            const res=await axios.post(`http://localhost:8000/api/addToCart`, {
//         productId: id,
//         quantity: productQuantityForCart
//        }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//        })
//         console.log("res of add to cart API", res)
//         if(res.data.success===true){
//           alert("Product added to cart successfully");
//            queryClient.invalidateQueries(["cartCount"]);
//           refetch();
//         }
        
//       }catch(err){
//         console.error("Error adding product to cart:", err);
       
//       }

//   }

  

//   return (
//     <div className="bg-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 pt-2 pb-5">
//       <div className="flex flex-col lg:flex-row gap-5">

//         {/* LEFT SIDE - Images */}
//         <div className="bg-white w-full lg:w-1/2 p-4 sm:p-6 flex flex-col   gap-5">

//           {/* Main Image */}
//           {selectedImage && (
//             <div className="w-full h-72 sm:h-96 md:h-[500px] lg:h-[520px] border-4 sm:border-6 lg:border-10 border-gray-200 rounded-2xl overflow-hidden flex justify-center items-center">
//               <img
//                 src={`http://localhost:8000/${selectedImage}`}
//                 alt="main"
//                 className="object-contain h-full w-full"
//               />
//             </div>
//           )}

//           {/* Thumbnails */}
       
// <div className="w-full flex justify-center mt-4">
//   <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
//     {images.map((img, index) => (
//       <img
//         key={index}
//         src={`http://localhost:8000/${img}`}
//         alt={`thumb-${index}`}
//         onClick={() => setSelectedImage(img)}
//         className={`h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-cover rounded-lg cursor-pointer border-2 ${
//           selectedImage === img ? "border-blue-500" : "border-gray-300"
//         }`}
//       />
//     ))}
//   </div>
// </div>
         
//         </div>

//         {/* RIGHT SIDE - Product Info */}
//         <div className="bg-white w-full lg:w-1/2 p-5 flex flex-col gap-4">

//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
//             {product?.product_name}
//           </h1>

//           <p className="text-gray-700 text-sm sm:text-base">
//             {product.product_description}
//           </p>

//           <p className="text-lg sm:text-xl md:text-2xl font-semibold">
//             ₹{product.product_price}
//           </p>

//           {product.product_attributes && (
//             <div className="flex flex-wrap gap-5 mt-3">
//               {Object.entries(product.product_attributes).map(
//                 ([key, value], index) => (
//                   <div key={index}>
//                     <p className="font-semibold mb-1 capitalize">{key}</p>
//                     <button className="border px-4 py-1 rounded bg-gray-100">
//                       {value}
//                     </button>
//                   </div>
//                 )
//               )}
//             </div>
//           )}

//           {/* Reviews */}
//           <div className="flex flex-col gap-3 mt-5">
//             <div className="text-lg sm:text-xl font-semibold">
//               Reviews and Rating
//             </div>

//             {reviews.length > 0 ? (
//               <div className="flex flex-col gap-3">

//                 {reviews.map((item, index) => (
//                   <div key={index} className="border-b border-gray-300 pb-2">

//                     <p className="font-semibold text-gray-800">
//                       {item.first_name} {item.last_name}
//                     </p>

//                     <div className="flex text-yellow-400 text-lg">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <span key={star}>
//                           {star <= item.rating ? "★" : "☆"}
//                         </span>
//                       ))}
//                     </div>

//                     {item.review_text && (
//                       <p className="text-gray-700 mt-1 text-sm sm:text-base">
//                         {item.review_text}
//                       </p>
//                     )}
//                   </div>
//                 ))}

//                 {/* Pagination Buttons */}
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     className="text-white bg-red-400 px-3 py-1 rounded-xl text-sm font-semibold"
//                     onClick={() => {
//                       if (reviewPage === 1) return;
//                       setReviewPage(reviewPage - 1);
//                     }}
//                   >
//                     Previous
//                   </button>

//                   <button
//                     className="text-white bg-green-500 px-3 py-1 rounded-xl text-sm font-semibold"
//                     onClick={() => {
//                       if (reviews.length < 2) return;
//                       setReviewPage(reviewPage + 1);
//                     }}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500">0 Reviews</p>
//             )}
//           </div>

//           {/* Stock */}
//           {product.product_quantity > 0 ? (
//             <p className="text-green-600 font-semibold text-sm sm:text-base">
//               In Stock ({product.product_quantity} left)
//             </p>
//           ) : (
//             <p className="text-red-500 font-semibold">Not in stock</p>
//           )}


//           {/* how many quantity you want */}
       
       
//            <div className="">
//       {/* LABEL */}
//       <p className="text-lg text-gray-700 mb-2 font-medium">
//         Select the Quantity you want
//       </p>

//       {/* QUANTITY BOX */}
//       <div 
//       className="flex  items-center w-fit border rounded-xl overflow-hidden shadow-sm">
        
//         {/* MINUS */}
//         <button
//           onClick={()=>{
//             if(productQuantityForCart===1) return;
//             setProductQuantityForCart(productQuantityForCart-1)
//           }}
//           className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition disabled:opacity-40"
//           disabled={productQuantityForCart === 1}
//         >
//           <FiMinus className="text-lg" />
//         </button>

//         {/* VALUE */}
//         <span className="px-2 py-2 text-lg font-semibold bg-gray-50">
//           {productQuantityForCart}
//         </span>

//         {/* PLUS */}
//         <button
//           disabled={productQuantityForCart === product.product_quantity}
//           onClick={()=>{
//             if(productQuantityForCart===product.product_quantity) return;
//             setProductQuantityForCart(productQuantityForCart+1)
//           }}
        
//           className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition disabled:opacity-40"
//         >
//           <FiPlus className="text-lg" />
//         </button>
//       </div>
//     </div>


//           {/* Add to Cart */}
//          <div className="flex justify-center gap-5  w-full ">
        
//            {inCart?(
//             <button 
//            onClick={()=>navigate("/cart")}
//           className="cursor-pointer w-1/2 font-semibold border-1 px-5 py-3 rounded text-lg w-full ">
//             Go to Cart
//           </button>
//            ):(
//             <button 
//            onClick={handleAddToCart}
//           className="cursor-pointer w-1/2 font-semibold border-1 px-5 py-3 rounded text-lg w-full ">
//             Add to Cart
//           </button>
//            )}

//             <button 
//            className="cursor-pointer w-1/2 bg-yellow-400 font-semibold  px-5  py-3 rounded text-lg  w-full "
//           >
//             Buy at ₹ {product.product_price*productQuantityForCart}
//           </button>
//          </div>

//           {/* Rating */}
//           <div className="mt-6">
//             <h2 className="text-lg sm:text-xl font-semibold mb-2">
//               Rate this product
//             </h2>

//             <div className="flex gap-3 items-center flex-wrap">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                   key={star}
//                   onClick={() => handleRating(star)}
//                   className={
//                     star <= rating
//                       ? "text-yellow-400 cursor-pointer text-xl sm:text-2xl"
//                       : "text-gray-300 cursor-pointer text-xl sm:text-2xl"
//                   }
//                 >
//                   ★
//                 </span>
//               ))}

//               <span className="text-sm sm:text-base font-semibold">
//                 {getRatingText()}
//               </span>
//             </div>

//             {/* Review Box */}
//             <h2 className="text-lg sm:text-xl font-semibold mb-2 mt-5">
//               Review this product
//             </h2>

//             <textarea
//               className="border w-full p-3 h-28 sm:h-32 rounded"
//               placeholder="Write your review here..."
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//             ></textarea>

//             <button
//               onClick={handleReview}
//               className="bg-black text-white px-6 py-2 rounded mt-3 w-full sm:w-auto"
//             >
//               Submit Review
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;






import  api from "../../utils/api"; // ✅ only change
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { BASE_URL } from "../../utils/api";

function ProductDetails() {

  const queryClient=useQueryClient()

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const [reviewPage, setReviewPage] = useState(1);
  const [productQuantityForCart,setProductQuantityForCart]=useState(1)

  const fetchProduct = async () => {
    const res = await api.get(
      `/api/products/${id}?reviewPage=${reviewPage}&reviewLimit=2`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    // await new Promise((resolve) => setTimeout(resolve, 5000)); 
    // // to test loading state, you can remove this in production

    const productData = res.data.productDetail;
    const imgData = res.data.images;
    const review = res.data.reviews;
    const inCart = res.data.inCart;

    return { product: productData, images: imgData, reviews: review, inCart };
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["product", id,reviewPage],
    queryFn: fetchProduct,
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

if (isLoading) {
  return (
    <div className="bg-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 pt-2 pb-5 animate-pulse">
      
      <div className="flex flex-col lg:flex-row gap-5">

        {/* LEFT SIDE */}
        <div className="bg-white w-full lg:w-1/2 p-4 sm:p-6 flex flex-col gap-5">

          {/* Main Image */}
          <div className="w-full h-72 sm:h-96 md:h-[500px] lg:h-[520px] bg-gray-300 rounded-2xl"></div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 flex-wrap">
            {[1,2,3,4].map((i)=>(
              <div key={i} className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 bg-gray-300 rounded-lg"></div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white w-full lg:w-1/2 p-5 flex flex-col gap-4">

          {/* Title */}
          <div className="h-6 sm:h-8 w-3/4 bg-gray-300 rounded"></div>

          {/* Description */}
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded"></div>

          {/* Price */}
          <div className="h-6 w-32 bg-gray-300 rounded"></div>

          {/* Attributes */}
          <div className="flex gap-3 mt-3">
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
          </div>

          {/* Reviews */}
          <div className="mt-5">
            <div className="h-6 w-40 bg-gray-300 rounded mb-3"></div>

            {[1,2].map((i)=>(
              <div key={i} className="mb-3">
                <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
                <div className="h-4 w-24 bg-gray-300 rounded mb-1"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          {/* Stock */}
          <div className="h-4 w-40 bg-gray-300 rounded"></div>

          {/* Quantity */}
          <div className="h-10 w-40 bg-gray-300 rounded"></div>

          {/* Buttons */}
          <div className="flex gap-5">
            <div className="h-12 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-12 w-1/2 bg-gray-300 rounded"></div>
          </div>

          {/* Rating */}
          <div className="mt-6">
            <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="flex gap-2">
              {[1,2,3,4,5].map((i)=>(
                <div key={i} className="h-6 w-6 bg-gray-300 rounded"></div>
              ))}
            </div>

            {/* Review box */}
            <div className="h-28 bg-gray-300 rounded mt-4"></div>
            <div className="h-10 w-40 bg-gray-300 rounded mt-3"></div>
          </div>

        </div>

      </div>
    </div>
  );
}



  const { product, images, reviews, inCart } = data;

  if (!selectedImage && images.length) setSelectedImage(images[0]);

  const handleReview = async () => {
    try {
      const res = await api.post(
        `/api/review`,
        {
          productId: id,
          rating: "",
          review: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        res.data.success === true &&
        res.data.message === "Review submitted successfully"
      ) {
        alert("Review inserted successfully");
        setReviewText("");
        refetch();
        return;
      }

      if (
        res.data.success === true &&
        res.data.message === "Review updated successfully"
      ) {
        alert("Review updated successfully");
        setReviewText("");
        refetch();
        return;
      }
    } catch {
      console.log("Failed to submit review");
    }
  };

  const getRatingText = () => {
    if (rating === 1) return "Very Bad";
    if (rating === 2) return "Bad";
    if (rating === 3) return "Good";
    if (rating === 4) return "Very Good";
    if (rating === 5) return "Excellent";
  };

  const handleRating = async (star) => {
    setRating(star);

    try {
      await api.post(
        `/api/review`,
        {
          productId: id,
          rating: star,
          review: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refetch();
    } catch {
      console.log("Failed to submit rating");
    }
  };

  const handleAddToCart=async ()=>{
      try{
        const res=await api.post(
          `/api/addToCart`,
          {
            productId: id,
            quantity: productQuantityForCart
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if(res.data.success===true){
          alert("Product added to cart successfully");
          queryClient.invalidateQueries(["cartCount"]);
          refetch();
        }
        
      }catch(err){
        console.error("Error adding product to cart:", err);
      }
  }

   return (
    <div className="bg-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 pt-2 pb-5">
      <div className="flex flex-col lg:flex-row gap-5">

        {/* LEFT SIDE - Images */}
        <div className="bg-white w-full lg:w-1/2 p-4 sm:p-6 flex flex-col   gap-5">

          {/* Main Image */}
          {selectedImage && (
            <div className="w-full h-72 sm:h-96 md:h-[500px] lg:h-[520px] border-4 sm:border-6 lg:border-10 border-gray-200 rounded-2xl overflow-hidden flex justify-center items-center">
              <img
                src={`${BASE_URL}/${selectedImage}`}
                alt="main"
                className="object-contain h-full w-full"
              />
            </div>
          )}

          {/* Thumbnails */}
       
<div className="w-full flex justify-center mt-4">
  <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
    {images.map((img, index) => (
      <img
        key={index}
        src={`${BASE_URL}/${img}`}
        alt={`thumb-${index}`}
        onClick={() => setSelectedImage(img)}
        className={`h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-cover rounded-lg cursor-pointer border-2 ${
          selectedImage === img ? "border-blue-500" : "border-gray-300"
        }`}
      />
    ))}
  </div>
</div>
         
        </div>

        {/* RIGHT SIDE - Product Info */}
        <div className="bg-white w-full lg:w-1/2 p-5 flex flex-col gap-4">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {product?.product_name}
          </h1>

          <p className="text-gray-700 text-sm sm:text-base">
            {product.product_description}
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            ₹{product.product_price}
          </p>

          {product.product_attributes && (
            <div className="flex flex-wrap gap-5 mt-3">
              {Object.entries(product.product_attributes).map(
                ([key, value], index) => (
                  <div key={index}>
                    <p className="font-semibold mb-1 capitalize">{key}</p>
                    <button className="border px-4 py-1 rounded bg-gray-100">
                      {value}
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {/* Reviews */}
          <div className="flex flex-col gap-3 mt-5">
            <div className="text-lg sm:text-xl font-semibold">
              Reviews and Rating
            </div>

            {reviews.length > 0 ? (
              <div className="flex flex-col gap-3">

                {reviews.map((item, index) => (
                  <div key={index} className="border-b border-gray-300 pb-2">

                    <p className="font-semibold text-gray-800">
                      {item.first_name} {item.last_name}
                    </p>

                    <div className="flex text-yellow-400 text-lg">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          {star <= item.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>

                    {item.review_text && (
                      <p className="text-gray-700 mt-1 text-sm sm:text-base">
                        {item.review_text}
                      </p>
                    )}
                  </div>
                ))}

                {/* Pagination Buttons */}
                <div className="flex gap-2 mt-2">
                  <button
                    className="text-white bg-red-400 px-3 py-1 rounded-xl text-sm font-semibold"
                    onClick={() => {
                      if (reviewPage === 1) return;
                      setReviewPage(reviewPage - 1);
                    }}
                  >
                    Previous
                  </button>

                  <button
                    className="text-white bg-green-500 px-3 py-1 rounded-xl text-sm font-semibold"
                    onClick={() => {
                      if (reviews.length < 2) return;
                      setReviewPage(reviewPage + 1);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">0 Reviews</p>
            )}
          </div>

          {/* Stock */}
          {product.product_quantity > 0 ? (
            <p className="text-green-600 font-semibold text-sm sm:text-base">
              In Stock ({product.product_quantity} left)
            </p>
          ) : (
            <p className="text-red-500 font-semibold">Not in stock</p>
          )}


          {/* how many quantity you want */}
       
       
           <div className="">
      {/* LABEL */}
      <p className="text-lg text-gray-700 mb-2 font-medium">
        Select the Quantity you want
      </p>

      {/* QUANTITY BOX */}
      <div 
      className="flex  items-center w-fit border rounded-xl overflow-hidden shadow-sm">
        
        {/* MINUS */}
        <button
          onClick={()=>{
            if(productQuantityForCart===1) return;
            setProductQuantityForCart(productQuantityForCart-1)
          }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition disabled:opacity-40"
          disabled={productQuantityForCart === 1}
        >
          <FiMinus className="text-lg" />
        </button>

        {/* VALUE */}
        <span className="px-2 py-2 text-lg font-semibold bg-gray-50">
          {productQuantityForCart}
        </span>

        {/* PLUS */}
        <button
          disabled={productQuantityForCart === product.product_quantity}
          onClick={()=>{
            if(productQuantityForCart===product.product_quantity) return;
            setProductQuantityForCart(productQuantityForCart+1)
          }}
        
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition disabled:opacity-40"
        >
          <FiPlus className="text-lg" />
        </button>
      </div>
    </div>


          {/* Add to Cart */}
         <div className="flex justify-center gap-5  w-full ">
        
           {inCart?(
            <button 
           onClick={()=>navigate("/cart")}
          className="cursor-pointer w-1/2 font-semibold border-1 px-5 py-3 rounded text-lg w-full ">
            Go to Cart
          </button>
           ):(
            <button 
           onClick={handleAddToCart}
          className="cursor-pointer w-1/2 font-semibold border-1 px-5 py-3 rounded text-lg w-full ">
            Add to Cart
          </button>
           )}

            <button 
           className="cursor-pointer w-1/2 bg-yellow-400 font-semibold  px-5  py-3 rounded text-lg  w-full "
          >
            Buy at ₹ {product.product_price*productQuantityForCart}
          </button>
         </div>

          {/* Rating */}
          <div className="mt-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Rate this product
            </h2>

            <div className="flex gap-3 items-center flex-wrap">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  className={
                    star <= rating
                      ? "text-yellow-400 cursor-pointer text-xl sm:text-2xl"
                      : "text-gray-300 cursor-pointer text-xl sm:text-2xl"
                  }
                >
                  ★
                </span>
              ))}

              <span className="text-sm sm:text-base font-semibold">
                {getRatingText()}
              </span>
            </div>

            {/* Review Box */}
            <h2 className="text-lg sm:text-xl font-semibold mb-2 mt-5">
              Review this product
            </h2>

            <textarea
              className="border w-full p-3 h-28 sm:h-32 rounded"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            <button
              onClick={handleReview}
              className="bg-black text-white px-6 py-2 rounded mt-3 w-full sm:w-auto"
            >
              Submit Review
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;