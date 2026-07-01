import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox';

const AdsBannerSlider = (props) => {
  return (
    <div className='!py-5 bg-white'>
                <Swiper
              slidesPerView={props.items}
              spaceBetween={10}
              modules={[Navigation]}
              navigation={true}
              className="smlBtn">

              <SwiperSlide>
                <BannerBox img ={'/Banner.png'} link={'/'}/>
              </SwiperSlide>


              <SwiperSlide>
                <BannerBox img ={'/Banner2.png'} link={'/'}/>
              </SwiperSlide>

              <SwiperSlide>
                <BannerBox img ={'/Banner3.png'} link={'/'}/>
              </SwiperSlide>

              <SwiperSlide>
                <BannerBox img ={'/Banner4.png'} link={'/'}/>
              </SwiperSlide>

              <SwiperSlide>
                <BannerBox img ={'/Banner5.png'} link={'/'}/>
              </SwiperSlide>

              <SwiperSlide>
                <BannerBox img ={'/Banner6.png'} link={'/'}/>
              </SwiperSlide>



              </Swiper>
    </div>
  );
}

export default AdsBannerSlider;
