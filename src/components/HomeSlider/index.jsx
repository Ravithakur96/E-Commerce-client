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
              <img src="https://serviceapi.spicezgold.com/download/1755503418386_NewProject(12).jpg" alt="Banner Slide" className="w-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='items rounded-[20px] overflow-hidden'>
              <img src="https://serviceapi.spicezgold.com/download/1755503364377_1721277298204_banner.jpg" alt="Banner Slide" className="w-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='items rounded-[20px] overflow-hidden'>
              <img src="https://serviceapi.spicezgold.com/download/1751685144346_NewProject(11).jpg" alt="Banner Slide" className="w-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='items rounded-[20px] overflow-hidden'>
              <img src="https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg" alt="Banner Slide" className="w-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='items rounded-[20px] overflow-hidden'>
              <img src="https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg" alt="Banner Slide" className="w-full" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;
