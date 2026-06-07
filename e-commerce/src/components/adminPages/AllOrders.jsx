import React from 'react'
import api from '../../utils/api'

function AllOrders() {

     const handleAllOrders=async ()=>{
         try {
      const res = await api.get("/api/allOrdersAdmin")  
      console.log("all orders res", res.data.allOrdersDetails)
      // await new Promise((resolve)=>setTimeout(resolve,5000))
      return res.data.allOrdersDetails || []
    } catch {
      console.log("error fetching allOrders")
      return []
    }
  }


    const {data:allOrders,isLoading:allOrdersLoader}=useQuery({
       queryKey:['allOrdersDetails'],
       queryFn:handleAllOrders,
       cacheTime:1000*60*10, // 5 min cache
    staleTime:1000*60*10, // 2 min fresh
  })

  return (
    <div>AllOrders</div>
  )
}

export default AllOrders