import { lazy, Suspense } from 'react'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Footer from './components/footer/Footer'
import Nav from './components/nav/Nav'

import { QueryClient,QueryClientProvider } from '@tanstack/react-query'

const Home=lazy(()=>import('./components/home/Home'))
const AllProduct=lazy(()=>import('./components/allProducts/AllProduct'))
const ProductDetails=lazy(()=>import('./components/pages/ProductDetails'))
const NewlyAddedProduct=lazy(()=>import('./components/pages/NewlyAddedProduct'))

function App() {
    
  const queryClient=new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <Nav/>
  {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Suspense fallback={<div className='bg-gray-100 px-10 py-2'><h1 className=' bg-white text-center p-5 text-black text-6xl'>⏳ Loading...</h1></div>}>
    <Routes>
      <Route path='/' element={<Home/>}/>
     
      <Route path='/AllProducts' element={<AllProduct/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/newlyAddedProducts' element={<NewlyAddedProduct/>}/>
      
    </Routes>
    </Suspense>
     <Footer/>
  </BrowserRouter>
  </QueryClientProvider>
    </>


  )
}

export default App
