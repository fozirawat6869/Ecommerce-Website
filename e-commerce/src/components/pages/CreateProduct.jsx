

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function CreateProductAdmin() {
//   const [categories, setCategories] = useState([]);
//   const [attributes, setAttributes] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category_id: "",
//     attribute_id: "",
//   });

//   // Fetch categories
//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/categories")
//       .then((res) => {
//         setCategories(res.data.categories);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   // Fetch attributes
//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/attributes")
//       .then((res) => {
//         console.log("attributes ",res.data.attributes)
//         setAttributes(res.data.attributes);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Submit form
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("FORM DATA 👉", formData);

//     // axios.post("http://localhost:8000/api/products", formData)
//   };

//   return (
//     <div className=" bg-gray-100 flex items-center justify-center pt-2">
//       <div className="bg-white w-full max-w-2xl rounded-xl shadow-md p-6">

//         {/* Header */}
//         <h2 className="text-2xl font-semibold mb-6 border-b pb-3 text-center">
//           Add New Product
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Product Name */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Product Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="e.g. Cotton T-Shirt"
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               rows="3"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Short product description"
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Price (₹)
//             </label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               placeholder="499"
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* Category Select */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Category
//             </label>
//             <select
//               name="category_id"
//               value={formData.category_id}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option
//                   key={cat.category_id}
//                   value={cat.category_id}
//                 >
//                   {cat.category_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Attribute Select */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Attribute
//             </label>
//             <select
//               name="attribute_id"
//               value={formData.attribute_id}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//             >
//               <option value="">Select Attribute</option>
//               {attributes.map((attr) => (
//                 <option
//                   key={attr.id}
//                   value={attr.id}
//                 >
//                   {attr.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
//           >
//             Create Product
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateProductAdmin;



import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateProductAdmin() {
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    attribute_id: "",
    attribute_value_id: "",
  });

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err));
  }, []);

  // Fetch attributes
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/attributes")
      .then((res) => setAttributes(res.data.attributes))
      .catch((err) => console.log(err));
  }, []);

  // Fetch attribute values
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/attribute_values")
      .then((res) => setAttributeValues(res.data.attribute_values))
      .catch((err) => console.log(err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset attribute_value_id if attribute_id changes
    if (name === "attribute_id") {
      setFormData({ ...formData, [name]: value, attribute_value_id: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM DATA 👉", formData);
    // axios.post("http://localhost:8000/api/products", formData)
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center pt-2 ">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-md p-6">

        <h2 className="text-2xl font-semibold mb-6 border-b pb-3 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Cotton T-Shirt"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short product description"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="499"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Attribute Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Attribute</label>
            <select
              name="attribute_id"
              value={formData.attribute_id}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Attribute</option>
              {attributes.map((attr) => (
                <option key={attr.id} value={attr.id}>
                  {attr.name}
                </option>
              ))}
            </select>
          </div>

          {/* Attribute Value Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Attribute Value</label>
            <select
              name="attribute_value_id"
              value={formData.attribute_value_id}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              disabled={!formData.attribute_id} // Disable until attribute is selected
            >
              <option value="">Select Value</option>
              {attributeValues
                .filter(val => val.attribute_id.toString() === formData.attribute_id)
                .map(val => (
                  <option key={val.id} value={val.id}>
                    {val.value}
                  </option>
                ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Create Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateProductAdmin;

