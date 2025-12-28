

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

  // Category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;

    setFormData({
      name: "",
      description: "",
      price: "",
      category,
      attributes: {}
    });

    setActiveAttributes(filterConfig[category] || {});
  };

  // Checkbox handler (MULTI VALUE)
  const handleAttributeChange = (attrName, value) => {
    setFormData((prev) => {
      const currentValues = prev.attributes[attrName] || [];

      return {
        ...prev,
        attributes: {
          ...prev.attributes,
          [attrName]: currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value]
        }
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FINAL PRODUCT DATA 👉", formData);

    axios.post("http://localhost:8000/api/createProduct", formData);
  };

  return (
    <div className="bg-gray-100  flex justify-center pt-10">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
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
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* ATTRIBUTES */}
          {Object.keys(activeAttributes).length > 0 && (
            <div className="space-y-6 border-t pt-5">
              {Object.entries(activeAttributes).map(([attrName, values]) => (
                <div key={attrName}>
                  <p className="font-medium capitalize mb-2">
                    {attrName}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {values.map((val) => (
                      <label
                        key={val}
                        className="flex items-center gap-2 border px-3 py-1 rounded-lg"
                      >
                        <input
                          type="checkbox"
                          checked={
                            formData.attributes[attrName]?.includes(val) ||
                            false
                          }
                          onChange={() =>
                            handleAttributeChange(attrName, val)
                          }
                        />
                        {val}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Create Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateProductAdmin;
