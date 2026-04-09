

import { lazy, Suspense } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Home = lazy(() => import('./components/home/Home'))
const AllProduct = lazy(() => import('./components/allProducts/AllProduct'))
const ProductDetails = lazy(() => import('./components/pages/ProductDetails'))
const NewlyAddedProduct = lazy(() => import('./components/pages/NewlyAddedProduct'))
const MenCategoryPage = lazy(() => import('./components/pages/CategoryPage'))
const UserLoginPage = lazy(() => import('./components/pages/UserAndAdminLogin'))
const RegisterPage = lazy(() => import('./components/pages/RegisterPage'))
const UserProfile = lazy(() => import('./components/pages/UserProfile'))
const Orders = lazy(() => import('./components/pages/Orders'))
const CreateProduct = lazy(() => import('./components/pages/CreateProduct'))
const AdminHomePage = lazy(() => import('./components/pages/AdminHomePage'))
const ContactPage = lazy(() => import('./components/pages/ContactPage'))
const AboutUs = lazy(() => import('./components/pages/AboutUs'))
const AddToCart = lazy(() => import('./components/pages/AddToCart'))

import Layout from './components/layout/Layout'


// ─── fallback UI ──────────────────────────────────────────────────────────────
function DotsFallback() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-6">
   

      <div className="flex gap-2 items-end h-8">
  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0ms] [animation-duration:0.5s] [animation-timing-function:cubic-bezier(0.8,0,1,1)]" />
  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:100ms] [animation-duration:0.5s] [animation-timing-function:cubic-bezier(0.8,0,1,1)]" />
  <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce [animation-delay:200ms] [animation-duration:0.5s] [animation-timing-function:cubic-bezier(0.8,0,1,1)]" />
  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms] [animation-duration:0.5s] [animation-timing-function:cubic-bezier(0.8,0,1,1)]" />
  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:400ms] [animation-duration:0.5s] [animation-timing-function:cubic-bezier(0.8,0,1,1)]" />
</div>
     
      <p className="text-lg text-gray-400 tracking-widest uppercase animate-pulse">
        Loading...
      </p>
    </div>
  )
}



const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<DotsFallback />}> {/* 👈 swap here */}
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/AllProducts" element={<AllProduct />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/newlyAddedProducts" element={<NewlyAddedProduct />} />
              <Route path="/category/:category" element={<MenCategoryPage />} />
              <Route path="/login" element={<UserLoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/createProduct" element={<CreateProduct />} />
              <Route path="/adminHome" element={<AdminHomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/About" element={<AboutUs />} />
              <Route path="/cart" element={<AddToCart />} />
              <Route path="*" element={<div className="px-10 py-5 text-center">Page not found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App