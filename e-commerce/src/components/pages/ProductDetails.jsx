import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetails() {
    const [detail,setDetail]=useState([])
  
    const {id}=useParams()

    useEffect(()=>{
      axios.get(`http://localhost:8000/api/products/${id}`)
      .then((res)=>{
         console.log("details data",res)
      })
      .catch((err)=>{
        console.log("error in fetching product details", err)
      })
    },[])
  return (
    <>
     details
    </>
  )
}

export default ProductDetails