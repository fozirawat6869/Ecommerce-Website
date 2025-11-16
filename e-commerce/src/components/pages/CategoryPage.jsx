


import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useQuery } from '@tanstack/react-query';

function CategoryPage() {

  const param=useParams()
  const category=param.category

   const [showSection,setShowSection]=useState({
     category:false,
     price:false,
     size:false,
     color:false
   })

   const [page,setPage]=useState(1)


  const [categoryValue,setCategoryValue]=useState("")
  const [price,setPrice]=useState("")
    
    const fetchProducts=async()=>{
        try{
            const res=await axios.get(`http://localhost:8000/api/products?category=${category}&price=${price}&page=${page}&limit=${10}`)
            // setData(res.data.allProduct)
            console.log(res.data.allProduct)
            const data=res.data.allProduct
            return data
        }
        catch{
            console.log("error in fetching products")
        }
    }
  
// useQuery hook  to fetch and cache data
    const{data}=useQuery({
        queryKey:['products',page,categoryValue,price,category],
        queryFn:fetchProducts,  
        cacheTime:1000*60*5,
        staleTime:1000*60*5
    })



    const handleCategory = (e) => {
  if (categoryValue === e.target.value) {
    setCategoryValue(""); // uncheck
  } else {
    setCategoryValue(e.target.value); // check
  }
  setPage(1);
};

const handlePrice = (e) => {
  if (price === e.target.value) {
    setPrice(""); // uncheck
  } else {
    setPrice(e.target.value); // check
  }
  setPage(1);
};

  return (
    <>
    <main className='flex  gap-5 bg-gray-100 px-8 py-4'>

    {/* left part customize */}
    <div className='flex flex-col bg-white h-auto w-1/4  '>

       <h1 className='text-center text-xl py-4 '>Filter</h1>


      {/* Left Category section */}
       <div className=' border-t-1 border-gray-300 px-5 py-4'>
          <div className='flex justify-between items-center  cursor-pointer  '
           onClick={()=>setShowSection(prev=>({...prev,category:!prev.category}))}>
          <h2>CATEGORY</h2>
           {showSection.category===true?<IoIosArrowUp/>:<IoIosArrowDown/>}
         
           </div>
           {showSection.category && (
            <div className='flex flex-col pt-3 '>
                <div className='flex gap-3'>
                 <input
                  type="checkbox"
                  value="Men" 
                  onChange={handleCategory} 
                  checked={categoryValue==="Men"}
                  
                  />

                 <label htmlFor="">Men</label>
                </div>
                <div className='flex gap-3'>
                 <input 
                 type="checkbox"
                  value="Women" 
                  onChange={handleCategory} 
                  checked={categoryValue==="Women"}
                  />
                 <label htmlFor="">Women</label>
                </div>
                {/* <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="Men" />
                 <label htmlFor="">Men</label>
                </div> */}
            </div>
        )}
       </div>

        {/* Left Price Section */}

   
        <div className='border-b-1 border-t-1 border-gray-300 px-5 py-4'>
          <div className='flex justify-between items-center  cursor-pointer  ' 
          onClick={()=>setShowSection(prev=>({...prev,price:!prev.price}))}>
          <h2>PRICE</h2>
           {showSection.price===true?<IoIosArrowUp/>:<IoIosArrowDown/>}
         
           </div>
           {showSection.price && (
            <div className='flex flex-col pt-3 '>
                <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="100"
                 checked={price==="100"}
                    onChange={handlePrice} 
                    />
                 <label htmlFor="">₹100</label>
                </div>
                <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="200" 
                 checked={price==="200"}
                    onChange={handlePrice} 
                   
                 />
                 <label htmlFor="">₹200</label>
                </div>
                <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="300"
                    onChange={handlePrice} 
                    checked={price==="300"}
                 />
                 <label htmlFor="">₹300</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="400"
                    onChange={handlePrice} 
                   checked={price==="400"}
                 />

                 <label htmlFor="">₹400</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="500" 
                 checked={price==="500"}
                   onChange={handlePrice} 
                 />
                 <label htmlFor="">₹500</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="1000" 
                 checked={price==="1000"}              
                    onChange={handlePrice}
                  />
                 <label htmlFor="">₹1000</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="1000plus"
                    onChange={handlePrice} 
                     checked={price==="1000plus"}
                  />
                 <label htmlFor="">₹1000+</label>
                </div>
            </div>
        )}
       </div>
        
{/*  Left Size section */}
     
     
        <div className='border-b-1  border-gray-300 px-5 py-4'>
          <div className='flex justify-between items-center  cursor-pointer  ' 
          onClick={()=>setShowSection(prev=>({...prev,size:!prev.size}))}>
          <h2>SIZE</h2>
           {showSection.size===true?<IoIosArrowUp/>:<IoIosArrowDown/>}
         
           </div>
           {showSection.size && (
            <div className='flex flex-col pt-3 '>
                <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="S" />
                 <label htmlFor="">S</label>
                </div>
                <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="M" />
                 <label htmlFor="">M</label>
                </div>
                <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="L" />
                 <label htmlFor="">L</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="XL" />
                 <label htmlFor="">XL</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="2XL" />
                 <label htmlFor="">2XL</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="3XL" />
                 <label htmlFor="">3XL</label>
                </div>
                 {/* <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="1000" />
                 <label htmlFor="">₹1000+</label>
                </div> */}
            </div>
        )}
       </div>


          {/* Left Color Section */}

   
        <div className='border-b-1  border-gray-300 px-5 py-4'>
          <div className='flex justify-between items-center  cursor-pointer  ' 
          onClick={()=>setShowSection(prev=>({...prev,color:!prev.color}))}>
          <h2>COLOR</h2>
           {showSection.color===true?<IoIosArrowUp/>:<IoIosArrowDown/>}
         
           </div>
           {showSection.color && (
            <div className='flex flex-col pt-3 '>
                <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="White" />
                 <label htmlFor="">White</label>
                </div>
                <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="Black" />
                 <label htmlFor="">Black</label>
                </div>
                <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="Green" />
                 <label htmlFor="">Green</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="Blue" />
                 <label htmlFor="">Blue</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="Gray" />
                 <label htmlFor="">Gray</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="Pink" />
                 <label htmlFor="">Pink</label>
                </div>
                 <div className='flex gap-3'>
                 <input type="checkbox" name="" id="" value="1000" />
                 <label htmlFor="">₹1000+</label>
                </div>
            </div>
        )}
       </div>
    

        
    </div>

   

    
       
   


    {/* right part  products */}
    <div className=' flex flex-col w-full  bg-white'>
    <h1 className='text-center font-bold text-2xl py-5 '>{category} Products</h1>
     <div className='flex gap-5 flex-wrap justify-center  pb-4'>
        
        {
            data?.map((item)=>(
                <Link to={`/product/${item.product_id}`} key={item.product_id}
                     className='  w-90 h-120 p-2  bg-gray-100 cursor-pointer '
                >
                    <div className='w-full h-[75%]'><img className=' w-full h-full' src={item.main_image} alt="jacket image" /></div>
                    <div className='w-full h-[25%] flex flex-col justify-center px-5  flex flex-col justify-center'>
                        <h2 className='text-gray-600 text-[18px]'>{item.name}</h2> 
                        {/* <p>{item.description}</p> */}
                        <p>{item.description.length > 38 ? item.description.substring(0, 38) + "..." : item.description}</p>

                        <p className='font-bold text-[18px]'>₹{item.price}</p>
                       
                        <p>sfdgdfdfg</p>
                    </div>
                </Link>
            ))
        }
     </div>
     {/* Pagination */}
     <div className='pt-3 bg-gray-100 '>
       <div className='flex justify-center bg-white gap-5 p-5 '>
           <button
           disabled={page===1}
            onClick={()=>setPage(page-1)}
            className=' bg-red-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'>Previous</button>
            <button 
            disabled={data?.length<page*10}
            onClick={()=>setPage(page+1)}
            className=' bg-green-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'>Next</button>
        </div>
     </div>
    </div>
    </main>
    </>
  )
}

export default CategoryPage


