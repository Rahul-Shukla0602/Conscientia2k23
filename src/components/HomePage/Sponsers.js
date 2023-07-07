import React from 'react';

// import SwiperCore, { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper";
// import Swiper from 'swiper';
// import { SwiperSlide } from 'swiper/react';

// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";

// import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";

import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { Sponsers } from '../../data/Sponser-data';
import './Sponsers.css'


SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);

function Sponsors() {

  // useLayoutEffect(() => {

  //   const swiper = new Swiper('.swiper',{
  //     loop: true,
  //     autoplay: true,
  //     autoplayTimeout: 1000,
  //     autoplayHoverPause: true,

  //     effect: "coverflow",
  //     grabCursor: true,
  //     centeredSlides: true,
  //     slidesPerView: "auto",
  //     coverflowEffect: {
  //       rotate: 0,
  //       stretch: 0,
  //       depth: 300,
  //       modifier: 1,
  //       slideShadows: false,
  //     },
  //     pagination:{
  //       el: ".swiper-pagination"
  //     },
  //   });

  // }, [])



  return (
    <div className='body1'>
      <Swiper
        loop={true}
        effect={"coverflow"}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}

        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        className="mySwiper"
      >
        {Sponsers.map((img, i) => {
          return (
            <SwiperSlide key={i} className='bg-richblack-50'>
              <div className="card_image">
                <img className='card_image_src' src={img.logo} alt={img.alt} />
              </div>
              <div className="card_content">
                <span className="card_title">
                  {img.name}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  )
}

export default Sponsors