


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
    image:"",
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

  setFormData((prev) => ({
    ...prev,
    category,
    attributes: {}
  }));

  setActiveAttributes(filterConfig[category] || {});
};
  // const handleCategoryChange = (e) => {
  //   const category = e.target.value;

  //   setFormData({
  //     name: "",
  //     description: "",
  //     price: "",
  //     quantity: "",
  //     category,
  //     attributes: {}
  //   });

  //   setActiveAttributes(filterConfig[category] || {});
  // };

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();

    // const payload = {
    //   ...formData,
    //   price: Number(formData.price),
    //   quantity: Number(formData.quantity)
    // };

    // try{
    //        console.log("FINAL PRODUCT DATA 👉", payload);

    // axios.post("http://localhost:8000/api/createProduct", payload);

    // alert("Product created successfully!");
    // setFormData({
    //   name: "",
    //   description: "",
    //   price: "",
    //   quantity: "",
    //   image:"",
    //   category: "",
    //   attributes: {}
    // });
    // setActiveAttributes({});
    // }
    // catch(err){
    //   console.log("Error creating product", err);
    //   alert("Failed to create product. Please try again.");
    // }

//     const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const data = new FormData();

//     // normal fields
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("price", formData.price); // send as string
//     data.append("quantity", formData.quantity);
//     data.append("category", formData.category);

//     // ✅ match backend key
//     data.append("main_image", formData.image);

//     // ✅ send attributes individually
//     if (formData.attributes.SubCategory) {
//       data.append("subCategory", "SubCategory");
//       data.append("subCategoryValue", formData.attributes.SubCategory);
//     }

//     if (formData.attributes.sizes) {
//       data.append("sizes", formData.attributes.sizes);
//     }

//     if (formData.attributes.colors) {
//       data.append("colors", formData.attributes.colors);
//     }

//     const res = await axios.post(
//       "http://localhost:8000/api/createProduct",
//       data,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     console.log(res.data);
//     alert("Product created successfully!");

//     setFormData({
//       name: "",
//       description: "",
//       price: "",
//       quantity: "",
//       image: "",
//       category: "",
//       attributes: {}
//     });

//     setActiveAttributes({});

//   } catch (err) {
//     console.log("Error creating product", err.response?.data || err);
//     alert("Failed to create product.");
//   }
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const data = new FormData();

//     // Basic product fields
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("price", Number(formData.price));
//     data.append("quantity", Number(formData.quantity));
//     data.append("category", formData.category);

//     // Image file (optional)
//     if (formData.image) {
//       data.append("main_image", formData.image);
//     }

//     // Attributes as JSON
//     if (formData.attributes && Object.keys(formData.attributes).length > 0) {
//       data.append("attributes", JSON.stringify(formData.attributes));
//     }

//     data.forEach((value, key) => {
//   console.log(key, value);
// });
//     console.log("data to be sent", data);

//     // Send to backend
//     const res = await axios.post(
//       "http://localhost:8000/api/createProduct",
//       data
//     );

//     console.log(res.data);
//     alert("Product created successfully!");

//     // Reset form
//     setFormData({
//       name: "",
//       description: "",
//       price: "",
//       quantity: "",
//       image: null,
//       category: "",
//       attributes: {}
//     });
//     setActiveAttributes({});
//   } catch (err) {
//     console.log("Error creating product", err.response?.data || err);
//     alert("Failed to create product.");
//   }
// };
   
//    const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const data = new FormData();

//     // append normal fields
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("price", Number(formData.price));
//     data.append("quantity", Number(formData.quantity));
//     data.append("category", formData.category);

//     // ✅ append image file
//     data.append("image", formData.image);

//     // ✅ send attributes as JSON string
//     data.append("attributes", JSON.stringify(formData.attributes));

//     console.log("SENDING FORM DATA...");
//      data.forEach((value,key)=>{
//       console.log(key,value)
//     })

//     console.log(data)

//     const res = await axios.post(
//       "http://localhost:8000/api/createProduct",
//       data
//     );

//  console.log("res data after api call",res.data)

//     alert("Product created successfully!");

//     // reset
//     setFormData({
//       name: "",
//       description: "",
//       price: "",
//       quantity: "",
//       image: "",
//       category: "",
//       attributes: {}
//     });

//     setActiveAttributes({});

//   } catch (err) {
//     console.log("Error creating product", err);
//     alert("Failed to create product.");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);       // send as string
    data.append("quantity", formData.quantity);
    data.append("category", formData.category);

    if (formData.image) data.append("image", formData.image); // must match multer

    // append attributes as individual fields (not JSON)
    if (formData.attributes.brand) data.append("brand", formData.attributes.brand);
    if (formData.attributes.type) data.append("type", formData.attributes.type);

    // debug
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    const res = await axios.post(
      "http://localhost:8000/api/createProduct",
      data
    );

    console.log("res.data:", res.data);
    alert("Product created successfully!");

    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      image: null,
      category: "",
      attributes: {}
    });
    setActiveAttributes({});
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

<input type="file" name="image" id="" 
 onChange={(e)=>{
   setFormData({...formData,image:e.target.files[0]})
 }}
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
