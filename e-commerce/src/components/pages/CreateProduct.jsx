

import React, { useEffect, useState } from "react";
import axios from "axios";
import { filterConfig } from "../reuseCode/filterConfig"; // import config

function CreateProductAdmin() {
  const [categories, setCategories] = useState([]);
  const [activeAttributes, setActiveAttributes] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    attributes: {}
  });

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err));
  }, []);

  // When category changes
  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;

    setFormData({
      ...formData,
      category: categoryName,
      attributes: {}
    });

    // Load attributes from config
    setActiveAttributes(filterConfig[categoryName] || {});
  };

  // Handle attribute value change
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
    console.log("FINAL DATA 👉", formData);

    axios.post("http://localhost:8000/api/createProduct", formData)
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center pt-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-md p-6">

        <h2 className="text-2xl font-semibold mb-6 border-b pb-3 text-center">
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
            type="number"
            placeholder="Price"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />

          {/* Category */}
          <select
            className="w-full border rounded-lg px-4 py-2"
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Dynamic Attributes */}
          {Object.entries(activeAttributes).map(([attrName, values]) => (
            <div key={attrName}>
              <label className="block mb-1 font-medium capitalize">
                {attrName}
              </label>
              <select
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  handleAttributeChange(attrName, e.target.value)
                }
              >
                <option value="">Select {attrName}</option>
                {values.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg"
            type="submit"
          >
            Create Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateProductAdmin;
