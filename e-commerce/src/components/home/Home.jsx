import React from 'react'
import Footer from '../footer/Footer'
import Nav from '../nav/nav'
import ImageSlider from '../imageSlider/ImageSlider'

function Home() {
  return (
    <>
    <Nav/>
    <ImageSlider/>
    <div className='bg-yellow-200 p-5'>
      <h1 className='text-3xl bg-red-300 text-center p-5'>Home component</h1>
    </div>
    <Footer/>
    </>
   
  )
}

export default Home