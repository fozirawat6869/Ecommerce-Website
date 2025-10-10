import React from 'react'
import Footer from '../footer/Footer'
import Nav from '../nav/nav'
import ImageSlider from '../imageSlider/ImageSlider'
import Categories from '../category/Categories'
import EcommerceDemo from '../test'


function Home() {
  return (
    <>
    <Nav/>
    <Categories/>
    <ImageSlider/>
    <div className='bg-yellow-200 p-5'>
      <h1 className='text-3xl bg-red-300 text-center p-5'>Home component</h1>
    </div>
    <Footer/>
    {/* <EcommerceDemo/> */}
   
    </>
   
  )
}

export default Home