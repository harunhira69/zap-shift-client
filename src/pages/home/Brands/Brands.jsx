import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png'
import amazonVector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import monster from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import starPeople from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';

const Brands = () => {
    const brandLogos = [
        amazon,amazonVector,casio,monster,randstad,star,starPeople
    ]
    return (
        <Swiper
          slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        >
            {brandLogos.map((logo,index)=>
                  <SwiperSlide key={index}>
                    <img src={logo} alt="" />
                  </SwiperSlide>

            )}
      
     
        </Swiper>
    );
};

export default Brands;
