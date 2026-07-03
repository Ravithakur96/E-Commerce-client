import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox';
import BannerBoxV2 from '../bannerBoxV2';

const AdsBannerSliderV2 = (props) => {
  return (
    <div className='!py-5 bg-white'>
                <Swiper
              slidesPerView={props.items}
              spaceBetween={10}
              modules={[Navigation]}
              navigation={true}
              className="smlBtn">

              <SwiperSlide>
                <BannerBoxV2 info = "left" image={'https://www.shutterstock.com/image-vector/ecommerce-web-banner-3d-smartphone-260nw-2069305328.jpg'} link={'/'}/>
              </SwiperSlide>


              <SwiperSlide>
                <BannerBoxV2 info = "right" image={'https://www.shutterstock.com/image-vector/ecommerce-web-banner-3d-smartphone-260nw-2069305328.jpg'} link={'/'}/>
              </SwiperSlide>

              <SwiperSlide>
                <BannerBoxV2 info = "right" image={'https://www.shutterstock.com/image-vector/ecommerce-web-banner-3d-smartphone-260nw-2069305328.jpg'} link={'/'}/>
              </SwiperSlide>

              <SwiperSlide>
                <BannerBoxV2 info = "right" image={'https://www.shutterstock.com/image-vector/ecommerce-web-banner-3d-smartphone-260nw-2069305328.jpg'} link={'/'}/>
              </SwiperSlide>

              <SwiperSlide>
                <BannerBoxV2 info = "left" image={'https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg'} link={'/'}/>
              </SwiperSlide>

              <SwiperSlide>
                <BannerBoxV2 info = "left" image={'https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg'} link={'/'}/>
              </SwiperSlide>

              </Swiper>
    </div>
  );
}

export default AdsBannerSliderV2;
