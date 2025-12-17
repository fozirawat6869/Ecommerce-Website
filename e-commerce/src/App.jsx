import { lazy, Suspense } from 'react'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'


import { QueryClient,QueryClientProvider } from '@tanstack/react-query'


const Home=lazy(()=>import('./components/home/Home'))
const AllProduct=lazy(()=>import('./components/allProducts/AllProduct'))
const ProductDetails=lazy(()=>import('./components/pages/ProductDetails'))
const NewlyAddedProduct=lazy(()=>import('./components/pages/NewlyAddedProduct'))
const MenCategoryPage=lazy(()=>import('./components/pages/CategoryPage'))  
const UserLoginPage=lazy(()=>import('./components/pages/UserLoginPage'))
const RegisterPage=lazy(()=>import('./components/pages/RegisterPage'))
const UserProfile=lazy(()=>import('./components/pages/UserProfile'))
const Orders=lazy(()=>import('./components/pages/Orders'))

import Layout from "./components/layout/Layout";






function App() {
    
  const queryClient=new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  
  {/* <Nav/> */}
  
    <Suspense fallback={<div className='bg-gray-100 px-10 py-2 '><h1 className=' bg-white text-center p-5 text-black text-6xl'>⏳ Loading...</h1></div>}>
    <Routes>
      <Route element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
     
      <Route path='/AllProducts' element={<AllProduct/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/newlyAddedProducts' element={<NewlyAddedProduct/>}/>
      <Route path='/Category/:category' element={<MenCategoryPage/>} />
      <Route path='/login' element={<UserLoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/profile' element={<UserProfile/>} />
      <Route path='/orders' element={<Orders/>}  />

      <Route path="*" element={<div className='px-10 py-5 text-center '>Page not found</div>}  />
      
      </Route>
     </Routes>
    
    </Suspense>
     {/* <Footer/> */}
     
  </BrowserRouter>
  </QueryClientProvider>
    </>


  )
}

export default App
