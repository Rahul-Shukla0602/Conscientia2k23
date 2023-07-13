import React from 'react'
import image1 from '../../assets/image/original_new.png'
import image2 from '../../assets/image/p1_new.png'
import image3 from '../../assets/image/p2_i.png'
import image4 from '../../assets/image/p2_ii.png'
import image5 from '../../assets/image/star_new.png'

import mobimage1 from '../../assets/image/bg_mob.png'
import mobimage2 from '../../assets/image/p1_mob.png'
import mobimage3 from '../../assets/image/p2i_mob.png'
import mobimage4 from '../../assets/image/p2ii_mob.png'
import mobimage5 from '../../assets/image/star_mob.png'

import { useRef, useEffect } from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/all'
import logoweb from '../../assets/image/logo_web@4x.png'
import ImageSlider from './Slider/ImageSlider'
import { IMAGES } from '../../data/Slider-data'
import './ParallaxSection.css'
function ParllaxSection() {

  const ref = useRef(null)
  gsap.registerPlugin(ScrollTrigger);


  // Parallax for desktop
  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element.querySelector("#m1"),
      {
        y: 100
      },
      {
        y: 0,
        scrollTrigger: {
          trigger: element.querySelector(".topbody"),
          start: "top top",
          end: "bottom center",
          scrub: true
        }
      }
    );

    gsap.fromTo(
      element.querySelector("#mleft"),
      {
        x: -100
      },
      {
        x: 0,
        scrollTrigger: {
          trigger: element.querySelector(".topbody"),
          start: "top top",
          end: "bottom center",
          scrub: true
        }
      }
    );

    gsap.fromTo(
      element.querySelector("#mright"),
      {
        x: 100
      },
      {
        x: 0,
        scrollTrigger: {
          trigger: element.querySelector(".topbody"),
          start: "top top",
          end: "bottom center",
          scrub: true
        }
      }
    );

    gsap.fromTo(
      element.querySelector("#m5"),
      {
        y: 300
      },
      {
        y: 0,
        scrollTrigger: {
          trigger: element.querySelector(".topbody"),
          start: "top top",
          end: "bottom center",
          scrub: true
        }
      }
    );
  }, []);

  // Parallax for mobile
  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element.querySelector("#m1mob"),
      {
        y: 100
      },
      {
        y: 0,
        scrollTrigger: {
          trigger: element.querySelector(".topbody"),
          start: "top top",
          end: "bottom center",
          scrub: true
        }
      }
    );

    gsap.fromTo(
      element.querySelector("#mobleft"),
      {
        x: -100
      },
      {
        x: 0,
        scrollTrigger: {
          trigger: element.querySelector(".topbody"),
          start: "top top",
          end: "bottom center",
          scrub: true
        }
      }
    );

    gsap.fromTo(
      element.querySelector("#mobright"),
      {
        x: 100
      },
      {
        x: 0,
        scrollTrigger: {
          trigger: element.querySelector(".topbody"),
          start: "top top",
          end: "bottom center",
          scrub: true
        }
      }
    );

    gsap.fromTo(
      element.querySelector("#m5mob"),
      {
        y: 300
      },
      {
        y: 0,
        scrollTrigger: {
          trigger: element.querySelector(".topbody"),
          start: "top top",
          end: "bottom center",
          scrub: true
        }
      }
    );
  }, []);


  return (
    <div className="overflow-x-hidden relative" ref={ref}>

      <section className='mainbody relative justify-center items-center h-screen text-center'>
        <img className='absolute bottom-0 h-full left-0 w-full pointer-events-none' src={image1} id="bgp" alt=''/>
        <img className='absolute bottom-0 left-0 w-full pointer-events-none z-20' src={image2} id="m1" alt=''/>
        <img className='absolute bottom-0 left-0 w-full pointer-events-none z-20' src={image3} id="mleft" alt=''/>
        <img className='absolute bottom-0 left-0 w-full pointer-events-none z-20' src={image4} id="mright" alt=''/>
        <img className='absolute bottom-0 left-0 w-full pointer-events-none z-10' src={image5} id="m5" alt=''/>
      </section>

      <section className='maincontent relative justify-center items-center min-h-screen text-center'>
        <img className='absolute bottom-0 left-0 w-full h-full pointer-events-none' src={mobimage1} id="bgmob" alt=''/>
        <img className='absolute bottom-0 left-0 w-full pointer-events-none z-20' src={mobimage2} id="m1mob" alt=''/>
        <img className='absolute bottom-0 left-0 w-full pointer-events-none z-20' src={mobimage3} id="mobleft" alt=''/>
        <img className='absolute bottom-0 left-0 w-full pointer-events-none z-20' src={mobimage4} id="mobright" alt=''/>
        <img className='absolute bottom-0 left-0 w-full pointer-events-none z-10' src={mobimage5} id="m5mob" alt=''/>
      </section>

      <div className=' absolute z-40 h-screen w-screen top-[0] right-[0] flex items-center justify-center'>
        <img className='w-[370px] lg:w-3/5' src={logoweb} alt=''/>
      </div>
      <section className="z-40 relative bg-richblack-800 text-base text-white font-light p-16 mx-auto ">
      <p
      // style={{
      //       background: 'linear-gradient(117.95deg, #833AB4 -2.4%, #FD1D1D 52.25%, #FCB045 106.89%)',
      //       WebkitBackgroundClip: 'text',
      //       WebkitTextFillColor: 'transparent',
      //       textFillColor: 'transparent' 
      //   }}
      className='mb-10 text-center font-semibold lg:text-6xl text-2xl pb-10'
      >GLIMPSES OF CONSCIENTIA 2022</p>
      <ImageSlider images={IMAGES} slidesToShow={3} autoplay={true} />
      </section>
    </div>
  )
}

export default ParllaxSection
