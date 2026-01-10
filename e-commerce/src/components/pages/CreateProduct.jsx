


import React, { useEffect, useState } from "react";
import axios from "axios";
import { filterConfig } from "../reuseCode/filterConfig";

function CreateProductAdmin() {
  const [categories, setCategories] = useState([]);
  const [activeAttributes, setActiveAttributes] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    attributes: {}
  });

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  // Category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;

    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category,
      attributes: {}
    });

    setActiveAttributes(filterConfig[category] || {});
  };

  // SINGLE VALUE attribute handler (radio)
  const handleAttributeChange = (attrName, value) => {
    setFormData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attrName]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity)
    };

    console.log("FINAL PRODUCT DATA 👉", payload);

    axios.post("http://localhost:8000/api/createProduct", payload);
  };

  return (
    <div className="bg-gray-100 flex justify-center pt-2">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Product Name */}
          <input
            type="text"
            placeholder="Product Name"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Price */}
         
          <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Price (max 100000)"
  className="w-full border rounded-lg px-4 py-2"
  value={formData.price}
  onChange={(e) => {
    const raw = e.target.value.replace(/\D/g, "");

    if (raw === "") {
      setFormData({ ...formData, price: "" });
      return;
    }

    const num = Number(raw);

    // 🚫 HARD STOP if price exceeds max
    if (num > 100000) return;

    setFormData({ ...formData, price: raw });
  }}
  required
/>


          {/* Quantity (MAX 1,000,000) */}
        
          <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Quantity (max 100000)"
  className="w-full border rounded-lg px-4 py-2"
  value={formData.quantity}
  onChange={(e) => {
    const raw = e.target.value.replace(/\D/g, ""); // digits only
    if (raw === "") {
      setFormData({ ...formData, quantity: "" });
      return;
    }

    const num = Number(raw);

    // 🚫 HARD STOP if value exceeds 1 lakh
    if (num > 100000) return;

    setFormData({ ...formData, quantity: raw });
  }}
  required
/>


          {/* Category */}
          <select
            className="w-full border rounded-lg px-4 py-2"
            value={formData.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* ATTRIBUTES (RADIO BUTTONS) */}
          {Object.keys(activeAttributes).length > 0 && (
            <div className="space-y-6 border-t pt-5">
              {Object.entries(activeAttributes).map(
                ([attrName, values]) => (
                  <div key={attrName}>
                    <p className="font-medium capitalize mb-2">
                      {attrName}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      {values.map((val) => (
                        <label
                          key={val}
                          className="flex items-center gap-2 border px-3 py-1 rounded-lg cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={attrName}
                            value={val}
                            checked={
                              formData.attributes[attrName] === val
                            }
                            onChange={() =>
                              handleAttributeChange(attrName, val)
                            }
                            required
                          />
                          {val}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateProductAdmin;
