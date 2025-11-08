import { lazy, Suspense } from 'react'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Footer from './components/footer/Footer'
import Nav from './components/nav/Nav'

import { QueryClient,QueryClientProvider } from '@tanstack/react-query'

const Home=lazy(()=>import('./components/home/Home'))
const AllProduct=lazy(()=>new Promise((resolve)=>{
   setTimeout(()=>{resolve(import('./components/allProducts/AllProduct'))},5000)
}))
// const AllProducts=lazy(()=>import('./components/allProducts/AllProducts'))
const ProductDetails=lazy(()=>import('./components/pages/ProductDetails'))
// const NewelyProducts=lazy(()=>import('./components/newelyCreatedProducts/NewlyProducts'))

function App() {
    
  const queryClient=new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <Nav/>
  {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '50px',color:'black' }} className='text-center text-black text-6xl'>⏳ Loading...</div>}>
    <Routes>
      <Route path='/' element={<Home/>}/>
     
      <Route path='/AllProducts' element={<AllProduct/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      {/* <Route path='/newelyProducts' element={<NewelyProducts/>}/> */}
      
    </Routes>
    </Suspense>
     <Footer/>
  </BrowserRouter>
  </QueryClientProvider>
    </>


  )
}

export default App
