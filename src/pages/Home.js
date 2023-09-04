import React from 'react'
import './Home.css'
// import section1 from '../assets/section1.mp4'
// import ImageSlider from '../components/HomePage/Slider/ImageSlider'
// import { IMAGES} from "../data/Slider-data";
import Merchandise from '../components/HomePage/Merch/Merchandise';
import ParllaxSection from '../components/HomePage/ParallaxSection';
import Sponsers from '../components/HomePage/Sponsers';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className=' overflow-x-hidden'>

      <ParllaxSection/>

      <div className='lg:mt-[80px]'>
        <Merchandise/>
      </div>

      <div className=' text-richblack-50 bg-richblack-800 p-[130px] flex flex-col items-center justify-center gap-5'>
        <p className=' text-center text-5xl lg:text-8xl font-bold  text-white'
        style={{
            background: 'linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #a6e6ff 104.51%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textFillColor: 'transparent' ,
        }}
        >EVENTS</p>
        <Link
        className='text-center text-xl lg:text-4xl font-bold border-4 border-richblack-5 flex gap-3 items-center justify-center
        w-[300px]  lg:w-[600px]
        '
        to='https://drive.google.com/file/d/1t9WRwSMi1Ya8haIvoUjZUs2jmuY4L8iX/view?usp=share_link'
        >ALL EVENTS SCHEDULE
        <FaLongArrowAltRight/>
        </Link>
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
