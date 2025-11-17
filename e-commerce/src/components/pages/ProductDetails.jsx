
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(res.data.productDetail);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching product details:", err);
        setError("Failed to load product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <main className="flex flex-col md:flex-row gap-8 bg-gray-100 p-8">
      {/* Product Image */}
      <div className="md:w-1/2 bg-white p-5 flex justify-center items-center">
        <img
          src={product.main_image}
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 bg-white p-5 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
        <p className="text-gray-500">Category: {product.category}</p>
        <p className="text-gray-500">Stock: {product.stock}</p>

        {/* Add to Cart Button */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </main>
  );
}

export default ProductDetails;
