import React from 'react'
import './Home.css'
// import section1 from '../assets/section1.mp4'
// import ImageSlider from '../components/HomePage/Slider/ImageSlider'
// import { IMAGES} from "../data/Slider-data";
import Merchandise from '../components/HomePage/Merch/Merchandise';
import ParllaxSection from '../components/HomePage/ParallaxSection';
import Sponsers from '../components/HomePage/Sponsers';
import Footer from '../components/common/Footer';
const Home = () => {
  return (
    <div className=' overflow-x-hidden'>

      <ParllaxSection/>

      <div className='lg:mt-[80px]'>
        <Merchandise/>
      </div>
      <section className="z-40 relative bg-slate-900 text-base text-white font-light p-4 mb-8 lg:mb-10">
        <p
        style={{
            background: 'linear-gradient(117.95deg, #833AB4 -2.4%, #FD1D1D 52.25%, #FCB045 106.89%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textFillColor: 'transparent' 
        }}
        className=' text-center text-3xl lg:text-6xl mt-[100px] pb-10 lg:pb-20 font-bold'
        >PREVIOUS SPONSORS</p>
        <Sponsers/>
      </section>
      
      <div className=''>
      <Footer/>
      </div>
      
    </div>
  )
}

export default Home
