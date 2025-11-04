
import './App.css'
import Home from './components/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllProducts from './components/allProducts/allProducts'
import NewlyProducts from './components/newelyCreatedProducts/newelyProducts'
import Footer from './components/footer/Footer'
import Nav from './components/nav/Nav'
import ProductDetails from './components/pages/ProductDetails'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
function App() {
   
  const queryClient=new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
     
      <Route path='/AllProducts' element={<AllProducts/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/newelyProducts' element={<NewlyProducts/>}/>
      
    </Routes>
     <Footer/>
  </BrowserRouter>
  </QueryClientProvider>
    </>


  )
}

export default App
