import React, { useEffect, useState } from "react";
import axios from "axios";
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
    axios
      .get("http://localhost:8000/api/categories")
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

  // setActiveAttributes(filterConfig[category] || {});
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

  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);       // send as string
    data.append("quantity", formData.quantity);
    data.append("category", formData.category);
      // append attributes as individual fields (not JSON)
    // if (formData.attributes.brand) data.append("brand", formData.attributes.brand);
    // if (formData.attributes.type) data.append("type", formData.attributes.type);
// Append all attributes dynamically

Object.entries(formData.attributes).forEach(([key, value]) => {
  data.append(key, value); // key = attribute name, value = attribute value
});


    // if (formData.image) data.append("image", formData.image); // must match multer
    formData.image.forEach((file,index)=>{
      data.append("images",file)
    })
  

    // debug
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    const res = await axios.post(
      "http://localhost:8000/api/createProduct",
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
      inputRef.current.value="" // clear file input
    }
  } catch (err) {
    console.log("Error creating product", err.response?.data || err);
    alert("Failed to create product.");
  }
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

          {/* Description */}
          <textarea
          name="description"
            placeholder="Description"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Price */}
         
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

    // 🚫 HARD STOP if price exceeds max
    if (num > 100000) return;

    setFormData({ ...formData, price: raw });
  }}
  required
/>


          {/* Quantity (MAX 1,000,000) */}
        
          <input
          name="quantity"
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


{/* Image Upload (max 4) */}
<label className="block mb-1 text-gray-600">
  You can upload up to 4 images
</label>
<input
  type="file"
  name="image"
  ref={inputRef}
  multiple
    className="w-full border rounded-lg px-4 py-2"
     placeholder="Upload up to 4 images"
  accept="image/*"
  onChange={(e) => {
    // Convert FileList to array and limit to 4 files
    const files = Array.from(e.target.files);
//     Array.from(e.target.files) → turns the selected files into a real array
// [...formData.image, ...newFiles] → merges with existing images
// .slice(0, 4) → ensures max 4 images

      // Check if total exceeds 4
    if (formData.image.length + files.length > 4) {
      alert("You can upload a maximum of 4 images only!");
      return; // stop adding new files
    }
    const updatedFiles = [...formData.image,...files].slice(0, 4) // Combine with existing and limit to 4
    setFormData({ ...formData, image: updatedFiles });
  }}
/>

{/* Previews */}
{formData.image.length > 0 && (
  <div className="flex gap-3 mt-0 flex-wrap">
    {formData.image.map((file, index) => (
      <div key={index} className="relative">
        <img
          src={URL.createObjectURL(file)}
          alt={`preview-${index}`}
          className="h-20 w-20 object-cover rounded border"
        />
      </div>
    ))}
  </div>
)}

 


          {/* Category */}
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
