

import React, { useEffect, useState } from "react";
import api from "../../utils/api"; // ✅ changed
import { filterConfig } from "../reuseCode/filterConfig";
import { useRef } from "react";

function CreateProductAdmin() {
  const [categories, setCategories] = useState([]);
  const [activeAttributes, setActiveAttributes] = useState({});
 
  const inputRef=useRef(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image:[],
    category: "",
    attributes: {}
  });

  // Fetch categories
  useEffect(() => {
    api
      .get("/api/categories") // ✅ changed
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  // Category change
  const handleCategoryChange = (e) => {
  const categoryID = e.target.value;
  const categoryval=categories.find((cat)=>cat.id.toString()===categoryID)

  setFormData((prev) => ({
    ...prev,
    category:categoryID,
    attributes: {}
  }));
   const categoryName = categoryval?.name || "";
  setActiveAttributes(filterConfig[categoryName] || {}); 
};


  const handleAttributeChange = (attrName, value) => {
    setFormData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attrName]: value
      }
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("category", formData.category);

    Object.entries(formData.attributes).forEach(([key, value]) => {
      data.append(key, value);
    });

    formData.image.forEach((file,index)=>{
      data.append("images",file)
    })

    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    const res = await api.post( // ✅ changed
      "/api/createProduct",
      data
    );

    console.log("AFTER API CALL"); 
    console.log("res.data:", res.data);
    alert("Product created successfully!");

    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      image:[],
      category: "",
      attributes: {}
    });
    setActiveAttributes({});

    if(inputRef.current){
      inputRef.current.value=""
    }
  } catch (err) {
    console.log("Error creating product", err.response?.data || err);
    alert("Failed to create product.");
  }
};

  return (
    <div className="bg-gray-100 flex justify-center pt-2">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow">

        <h2 className="text-2xl text-blue-500 font-bold mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            type="text"
            placeholder="Product Name"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            name="price"
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
              if (num > 100000) return;
              setFormData({ ...formData, price: raw });
            }}
            required
          />

          <input
            name="quantity"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Quantity (max 100000)"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.quantity}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              if (raw === "") {
                setFormData({ ...formData, quantity: "" });
                return;
              }
              const num = Number(raw);
              if (num > 100000) return;
              setFormData({ ...formData, quantity: raw });
            }}
            required
          />

          <label className="block mb-1 text-gray-600">
            You can upload up to 4 images
          </label>

          <input
            type="file"
            name="image"
            ref={inputRef}
            multiple
            className="w-full border rounded-lg px-4 py-2"
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              if (formData.image.length + files.length > 4) {
                alert("You can upload a maximum of 4 images only!");
                return;
              }
              const updatedFiles = [...formData.image,...files].slice(0, 4)
              setFormData({ ...formData, image: updatedFiles });
            }}
          />

          {formData.image.length > 0 && (
            <div className="flex gap-3 mt-0 flex-wrap">
              {formData.image.map((file, index) => (
                <div key={index}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="h-20 w-20 object-cover rounded border"
                  />
                </div>
              ))}
            </div>
          )}

          <select
            className="w-full border rounded-lg px-4 py-2"
            value={formData.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

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