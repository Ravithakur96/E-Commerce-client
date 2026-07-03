import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';

const HomeSlider = () => {
  return (
    <div className='homeSlider !py-4'>
      <div className='container'>
        <Swiper
          spaceBetween={20}
          navigation={true}
          loop={true}
          modules={[Navigation, Autoplay]}
            autoplay={{
          delay: 2500,
          disableOnInteraction: false,}}

          

          className="sliderHome"
          slidesPerView={1.1}   
          centeredSlides={true}
        >
          <SwiperSlide>
            <div className='items rounded-[20px] overflow-hidden'>
              <img src="https://www.pngkey.com/png/detail/247-2475118_ecommerce-e-commerce-banner-png.png" alt="Banner Slide" className="w-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='items rounded-[20px] overflow-hidden'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jQ_zO1iPZoB2eBKO4nUtFkf3lD_ZyjlePuSTYO3qLdh6zsfLVsiFCKFD&s=10" alt="Banner Slide" className="w-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='items rounded-[20px] overflow-hidden'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0nVRTku5VhGKrYM2HioXkG7EzBNJbPMfzsjaehf_lWqOexIWF0cuGacQ&s=10" alt="Banner Slide" className="w-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='items rounded-[20px] overflow-hidden'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB5xmHrhUdj0rtweKkCkb78l1rWDq9xH5xN4jA5MLwMUJgEpGbpWIJhRg&s=10" alt="Banner Slide" className="w-full" />
            </div>
          </SwiperSlide>

         
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;
