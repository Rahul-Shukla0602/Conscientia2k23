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
            <SwiperSlide key={i}>
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
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" alt="" />
        </SwiperSlide> */}
      </Swiper>
      {/* <section className='swiper mySwiper'>
        <div className="swiper-wrapper">
          <div className="card swiper-slide">
            <div className="card_image">
              <img className='card_image_src' src="https://picsum.photos/200" alt="user1" />
            </div>
            <div className="card_content">
              <span className="card_title">
                Web Designer 1
              </span>
              <span className="card_name">Rose Bush 1</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi natus velit earum aliquam asperiores.</p>
              <button className='card_btn'>View More</button>
            </div>
          </div>
          <div className="card swiper-slide">
            <div className="card_image">
              <img className='card_image_src' src="https://picsum.photos/200" alt="user1" />
            </div>
            <div className="card_content">
              <span className="card_title">
                Web Designer 2
              </span>
              <span className="card_name">Rose Bush</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi natus velit earum aliquam asperiores.</p>
              <button className='card_btn'>View More</button>
            </div>
          </div>
          <div className="card swiper-slide">
            <div className="card_image">
              <img className='card_image_src' src="https://picsum.photos/200" alt="user1" />
            </div>
            <div className="card_content">
              <span className="card_title">
                Web Designer 3
              </span>
              <span className="card_name">Rose Bush</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi natus velit earum aliquam asperiores.</p>
              <button className='card_btn'>View More</button>
            </div>
          </div>
          <div className="card swiper-slide">
            <div className="card_image">
              <img className='card_image_src' src="https://picsum.photos/200" alt="user1" />
            </div>
            <div className="card_content">
              <span className="card_title">
                Web Designer 4
              </span>
              <span className="card_name">Rose Bush</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi natus velit earum aliquam asperiores.</p>
              <button className='card_btn'>View More</button>
            </div>
          </div>
          <div className="card swiper-slide">
            <div className="card_image">
              <img className='card_image_src' src="https://picsum.photos/200" alt="user1" />
            </div>
            <div className="card_content">
              <span className="card_title">
                Web Designer 5
              </span>
              <span className="card_name">Rose Bush</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi natus velit earum aliquam asperiores.</p>
              <button className='card_btn'>View More</button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Sponsors