import React, { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function AddAddress() {

    const queryClient = useQueryClient();

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const navigate=useNavigate()

  // LOADING STATE ADDED
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_no: "",
    pincode: "",
    state: "",
    city: "",
    addres: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Change

  const handleChange = (e) => {

    const { name, value } = e.target;

    // Only numbers allowed

    if (
      (name === "phone_no" || name === "pincode") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    // Phone max 10 digits

    if (name === "phone_no" && value.length > 10) {
      return;
    }

    // Pincode max 6 digits

    if (name === "pincode" && value.length > 6) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error while typing

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle Submit

  const handleSubmit = async (e) => {

    e.preventDefault();

    const newErrors = {};

    // Validation Fields

    const validateFields = {
      full_name: "Full name is required",
      phone_no: "Phone number is required",
      addres: "Address is required",
      city: "City is required",
      state: "Please select state",
      pincode: "Pincode is required",
    };

    // Dynamic Validation

    Object.entries(validateFields).forEach(
      ([key, message]) => {

        if (!formData[key].trim()) {
          newErrors[key] = message;
        }
      }
    );

    // Phone Validation

    if (
      formData.phone_no &&
      formData.phone_no.length !== 10
    ) {
      newErrors.phone_no =
        "Phone number must be 10 digits";
    }

    // Pincode Validation

    if (
      formData.pincode &&
      formData.pincode.length !== 6
    ) {
      newErrors.pincode =
        "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    // Stop Submit

    if (Object.keys(newErrors).length > 0) {
      return;
    }

 try {

  // LOADING TRUE
  setLoading(true);

  const token = localStorage.getItem("token");

  const res = await api.post(
    "/api/addAddress",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);

  // API success
  if (res.data.success) {

    // Refetch getAddress query
    await queryClient.invalidateQueries({
      queryKey: ["getAddress"],
    });

    alert(res.data.message);

    setFormData({
      full_name: "",
      phone_no: "",
      pincode: "",
      state: "",
      city: "",
      addres: "",
    });

    navigate("/paymentSection");
  }

} catch (err) {

  console.log(err);

  alert("Something went wrong");

} finally {

  // LOADING FALSE
  setLoading(false);
}
  };

  return (
  <div className=" bg-gray-100 flex items-start sm:items-center justify-center px-2 py-2 sm:px-5">

    <div className="w-full max-w-md sm:max-w-2xl bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-3xl shadow-lg sm:shadow-2xl">

      {/* Heading */}
      <div className="mb-5 sm:mb-8">

        <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
          Add Delivery Address
        </h1>

        <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">
          Enter your delivery details
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">

        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full name"
            className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
              ${errors.full_name ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
            `}
          />

          {errors.full_name && (
            <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>

          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            placeholder="10 digit number"
            className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
              ${errors.phone_no ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
            `}
          />

          {errors.phone_no && (
            <p className="text-red-500 text-xs mt-1">{errors.phone_no}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Address
          </label>

          <textarea
            rows="3"
            name="addres"
            value={formData.addres}
            onChange={handleChange}
            placeholder="House no, street..."
            className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none resize-none
              ${errors.addres ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
            `}
          ></textarea>

          {errors.addres && (
            <p className="text-red-500 text-xs mt-1">{errors.addres}</p>
          )}
        </div>

        {/* City + State */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">

          {/* City */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
                ${errors.city ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
              `}
            />

            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              State
            </label>

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
                ${errors.state ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
              `}
            >
              <option value="">Select State</option>

              {indianStates.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>

            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        {/* Pincode */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Pincode
          </label>

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
              ${errors.pincode ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
            `}
          />

          {errors.pincode && (
            <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg sm:rounded-2xl font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Address"}
          </button>

          <button
            onClick={() => navigate('/paymentSection')}
            type="button"
            className="w-full border border-gray-300 hover:bg-gray-100 py-2 sm:py-3 rounded-lg sm:rounded-2xl font-semibold text-sm sm:text-base"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  </div>
);
}

export default AddAddress;


// import React, { useState } from "react";
// import api from "../../utils/api";
// import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";

// function AddAddress() {

//     const queryClient = useQueryClient();

//   const indianStates = [
//     "Andhra Pradesh",
//     "Arunachal Pradesh",
//     "Assam",
//     "Bihar",
//     "Chhattisgarh",
//     "Goa",
//     "Gujarat",
//     "Haryana",
//     "Himachal Pradesh",
//     "Jharkhand",
//     "Karnataka",
//     "Kerala",
//     "Madhya Pradesh",
//     "Maharashtra",
//     "Manipur",
//     "Meghalaya",
//     "Mizoram",
//     "Nagaland",
//     "Odisha",
//     "Punjab",
//     "Rajasthan",
//     "Sikkim",
//     "Tamil Nadu",
//     "Telangana",
//     "Tripura",
//     "Uttar Pradesh",
//     "Uttarakhand",
//     "West Bengal",
//     "Andaman and Nicobar Islands",
//     "Chandigarh",
//     "Dadra and Nagar Haveli and Daman and Diu",
//     "Delhi",
//     "Jammu and Kashmir",
//     "Ladakh",
//     "Lakshadweep",
//     "Puducherry",
//   ];

//   const navigate=useNavigate()

//   const [formData, setFormData] = useState({
//     full_name: "",
//     phone_no: "",
//     pincode: "",
//     state: "",
//     city: "",
//     addres: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Handle Change

//   const handleChange = (e) => {

//     const { name, value } = e.target;

//     // Only numbers allowed

//     if (
//       (name === "phone_no" || name === "pincode") &&
//       !/^\d*$/.test(value)
//     ) {
//       return;
//     }

//     // Phone max 10 digits

//     if (name === "phone_no" && value.length > 10) {
//       return;
//     }

//     // Pincode max 6 digits

//     if (name === "pincode" && value.length > 6) {
//       return;
//     }

//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Remove error while typing

//     setErrors({
//       ...errors,
//       [name]: "",
//     });
//   };

//   // Handle Submit

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     const newErrors = {};

//     // Validation Fields

//     const validateFields = {
//       full_name: "Full name is required",
//       phone_no: "Phone number is required",
//       addres: "Address is required",
//       city: "City is required",
//       state: "Please select state",
//       pincode: "Pincode is required",
//     };

//     // Dynamic Validation

//     Object.entries(validateFields).forEach(
//       ([key, message]) => {

//         if (!formData[key].trim()) {
//           newErrors[key] = message;
//         }
//       }
//     );

//     // Phone Validation

//     if (
//       formData.phone_no &&
//       formData.phone_no.length !== 10
//     ) {
//       newErrors.phone_no =
//         "Phone number must be 10 digits";
//     }

//     // Pincode Validation

//     if (
//       formData.pincode &&
//       formData.pincode.length !== 6
//     ) {
//       newErrors.pincode =
//         "Pincode must be 6 digits";
//     }

//     setErrors(newErrors);

//     // Stop Submit

//     if (Object.keys(newErrors).length > 0) {
//       return;
//     }

//  try {

//   const token = localStorage.getItem("token");

//   const res = await api.post(
//     "/api/addAddress",
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   console.log(res.data);

//   // API success
//   if (res.data.success) {

//     // Refetch getAddress query
//     await queryClient.invalidateQueries({
//       queryKey: ["getAddress"],
//     });

//     alert(res.data.message);

//     setFormData({
//       full_name: "",
//       phone_no: "",
//       pincode: "",
//       state: "",
//       city: "",
//       addres: "",
//     });

//     navigate("/paymentSection");
//   }

// } catch (err) {

//   console.log(err);

//   alert("Something went wrong");
// }
//   };

//   return (
//   <div className=" bg-gray-100 flex items-start sm:items-center justify-center px-2 py-2 sm:px-5">

//     <div className="w-full max-w-md sm:max-w-2xl bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-3xl shadow-lg sm:shadow-2xl">

//       {/* Heading */}
//       <div className="mb-5 sm:mb-8">

//         <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
//           Add Delivery Address
//         </h1>

//         <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">
//           Enter your delivery details
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">

//         {/* Full Name */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Full Name
//           </label>

//           <input
//             type="text"
//             name="full_name"
//             value={formData.full_name}
//             onChange={handleChange}
//             placeholder="Full name"
//             className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
//               ${errors.full_name ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
//             `}
//           />

//           {errors.full_name && (
//             <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
//           )}
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Phone Number
//           </label>

//           <input
//             type="text"
//             name="phone_no"
//             value={formData.phone_no}
//             onChange={handleChange}
//             placeholder="10 digit number"
//             className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
//               ${errors.phone_no ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
//             `}
//           />

//           {errors.phone_no && (
//             <p className="text-red-500 text-xs mt-1">{errors.phone_no}</p>
//           )}
//         </div>

//         {/* Address */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Address
//           </label>

//           <textarea
//             rows="3"
//             name="addres"
//             value={formData.addres}
//             onChange={handleChange}
//             placeholder="House no, street..."
//             className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none resize-none
//               ${errors.addres ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
//             `}
//           ></textarea>

//           {errors.addres && (
//             <p className="text-red-500 text-xs mt-1">{errors.addres}</p>
//           )}
//         </div>

//         {/* City + State */}
//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">

//           {/* City */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               City
//             </label>

//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder="City"
//               className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
//                 ${errors.city ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
//               `}
//             />

//             {errors.city && (
//               <p className="text-red-500 text-xs mt-1">{errors.city}</p>
//             )}
//           </div>

//           {/* State */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               State
//             </label>

//             <select
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
//                 ${errors.state ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
//               `}
//             >
//               <option value="">Select State</option>

//               {indianStates.map((stateName) => (
//                 <option key={stateName} value={stateName}>
//                   {stateName}
//                 </option>
//               ))}
//             </select>

//             {errors.state && (
//               <p className="text-red-500 text-xs mt-1">{errors.state}</p>
//             )}
//           </div>
//         </div>

//         {/* Pincode */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Pincode
//           </label>

//           <input
//             type="text"
//             name="pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             placeholder="Pincode"
//             className={`w-full mt-1 border rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none
//               ${errors.pincode ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
//             `}
//           />

//           {errors.pincode && (
//             <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg sm:rounded-2xl font-semibold text-sm sm:text-base"
//           >
//             Save Address
//           </button>

//           <button
//             onClick={() => navigate('/paymentSection')}
//             type="button"
//             className="w-full border border-gray-300 hover:bg-gray-100 py-2 sm:py-3 rounded-lg sm:rounded-2xl font-semibold text-sm sm:text-base"
//           >
//             Cancel
//           </button>

//         </div>

//       </form>
//     </div>
//   </div>
// );
// }

// export default AddAddress;