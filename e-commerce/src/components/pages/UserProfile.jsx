

import { CgProfile } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function UserProfile() {

  const [editButton,setEditButton]=useState({
     forName:false,
     forEmail:false,
  })

  const [editFormData, setEditFormData] = useState({
  first_name: "",
  last_name: "",
  email: ""

});

  const [formData,setFormData]=useState({
    first_name:'',
    last_name:'',
    email:''
  })

  const token = localStorage.getItem("token");


   
  const fetchUserData =async () => {

    try{
        const res = await axios.get('http://localhost:8000/api/userProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      
    
      console.log("response" , res.data.user)
      return res.data.user || []
    }
    catch(err){
      console.error("Error fetching user data:", err);
    }
  };

  const{data,refetch}=useQuery({
    queryKey:["userProfile"],
    queryFn:fetchUserData,
    cacheTime:5*60*1000, // 5 minutes
    staleTime:5*60*1000, // 5 minutes
    
  })

   console.log(data)
   if(!data) return <h1 className="p-5">Loading....</h1>
   

console.log(formData)

const handleSubmit=async (e)=>{
    e.preventDefault();

    try{
       const res=await axios.post('http://localhost:8000/api/userProfile',formData,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        console.log("Profile update response:", res.data);
   
       if(res.data.success===true){
               alert("Profile updated successfully!")
               refetch();
       }
         

}
catch(err){
    console.error("Error updating user profile:", err);
}
}

const handleReUpdate=async ()=>{
      try{

   

       const updatedFormData={}

       if(data.first_name !== editFormData.first_name){
           updatedFormData.first_name=editFormData.first_name
       }
        if(data.last_name !== editFormData.last_name){
           updatedFormData.last_name=editFormData.last_name
       }
        if(data.email !== editFormData.email){
           updatedFormData.email=editFormData.email
       }
       
      
       
      
      
       
            if (Object.keys(updatedFormData).length === 0) {
  alert("Nothing to updated")
  return
}

        console.log("edit form data",editFormData)
        const res=await axios.post(`http://localhost:8000/api/reUpdateProfile`,updatedFormData,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        console.log("updata profile res ",res)

        if (res.data.success===true) {
      alert("Profile updated successfully")
      setEditButton(false)
      refetch()
    }
        
      }catch(err){
        console.log("failed to update the prodile", err)
      }
      
}



return (
  <div className=" bg-gray-100 p-3">

    {data?.first_name === "" && data?.last_name === "" && data?.email === "" ? (
      <>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Save
            </button>
          </form>
        </div>
      </>
    ) : (
      <>
        <div className="bg-gray-100 p-5 flex flex-col md:flex-row gap-10 items-start">

          {/* left side */}
          <div className="w-full md:w-[35%] flex flex-col gap-5 bg-white rounded-lg shadow-md p-5">
            <div className="flex gap-5 items-center bg-gray-50 p-4 rounded-md shadow-sm">
              <FaUserCircle className="text-5xl text-gray-400" />
              <div>
                <h1 className="text-gray-500">Hello,</h1>
                <p className="font-bold text-lg">{data?.first_name} {data?.last_name}</p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-700 p-3 rounded-md text-center font-semibold">
              All Details
            </div>
          </div>

          {/* right side */}
          <div className="w-full md:w-[65%] bg-white p-6 shadow-md rounded-lg flex flex-col gap-6">

            {/* PERSONAL INFO */}
            <div>
              <div className="flex items-center gap-5 mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
                <button
                 onClick={()=>{
                  setEditButton(
                    {
                      ...editButton,forName:!editButton.forName
                    }
                  )
                  setEditFormData({
                    ...editFormData,
                    first_name:data?.first_name,
                    last_name:data?.last_name,
                    
                  })
                }
                 }
                className="text-blue-600 text-sm font-medium hover:underline">
                  {editButton.forName?"cancel":"edit"}
                  </button>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={editButton.forName?editFormData.first_name:data?.first_name }
                  onChange={(e)=>setEditFormData({...editFormData,first_name:e.target.value})}
                  disabled={!editButton.forName}
                  className="border px-3 py-2 rounded-md w-full bg-gray-50"
                />
                <input
                  type="text"
                  value={editButton.forName?editFormData.last_name:data?.last_name || ""}
                  disabled={
                    !editButton.forName
                  }
                  onChange={(e)=>setEditFormData({...editFormData,last_name:e.target.value})} 
                  className="border px-3 py-2 rounded-md w-full bg-gray-50"
                />
                {editButton.forName && (
                  <button 
                  onClick={handleReUpdate}
                  className="bg-blue-500 text-white px-4 py-2">Save</button>
                )}
              </div>
            </div>

            {/* GENDER */}
            {/* <div>
              <p className="mb-2 text-sm font-medium text-gray-600">Your Gender</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="radio" name="gender" disabled className="accent-blue-600" />
                  Male
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="radio" name="gender" disabled className="accent-pink-600" />
                  Female
                </label>
              </div>
            </div> */}

            {/* EMAIL */}
            <div >
              <div className="flex items-center gap-5 mb-2">
                <h2 className="font-semibold text-gray-700">Email Address</h2>
                <button 
                  onClick={()=>{
                  setEditButton({
                    ...editButton,forEmail:!editButton.forEmail
                  })
                  setEditFormData({
                    ...editFormData,
                    email:data?.email
                  })
                }
                 }
                className="text-blue-600 text-sm hover:underline">
                  {editButton.forEmail?"Cancel":"Edit"}
                </button>
              </div>
              <input
                type="email"
                 value={editButton.forEmail?editFormData.email:data?.email || ""}
                  onChange={(e)=>setEditFormData({...editFormData,email:e.target.value})}
                  disabled={!editButton.forEmail}
                className="border px-3 py-2 rounded-md w-full md:w-[60%] bg-gray-50"
              />
              
                 {editButton.forEmail && (
                  <button 
                  onClick={handleReUpdate}
                  className="bg-blue-500 text-white px-4 py-2 mx-3 ">Save</button>
                )}
              
            </div>

            {/* MOBILE */}
            <div>
              <div className="flex items-center gap-5 mb-2">
                <h2 className="font-semibold text-gray-700">Mobile Number</h2>
                  </div>
              <input
                type="text"
                 value={data?.mobile}
                  disabled={!editButton.forMobile}
                className="border px-3 py-2 rounded-md w-full md:w-[60%] bg-gray-50"
              />
            </div>

          </div>
        </div>
      </>
    )}
  </div>
);

}


export default UserProfile;
