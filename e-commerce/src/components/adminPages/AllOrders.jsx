import React from 'react'
import api from '../../utils/api'
import { useQuery } from '@tanstack/react-query'

function AllOrders() {

    const token=localStorage.getItem('token')

     const handleAllOrders=async ()=>{
         try {
      const res = await api.get("/api/allOrderDetailsForAdmin",{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })  
      console.log("Total orders res", res.data.allData)
      // await new Promise((resolve)=>setTimeout(resolve,5000))
      return res.data.allData || []
    } catch {
      console.log("error fetching allOrders")
      return []
    }
  }


    const {data:allData,isLoading}=useQuery({
       queryKey:['allOrders'],
       queryFn:handleAllOrders,
       cacheTime:1000*60*10, // 5 min cache
    staleTime:1000*60*10, // 2 min fresh
  })

  return (
    <div>AllOrders</div>
  )
}

export default AllOrders