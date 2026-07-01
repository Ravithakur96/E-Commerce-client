import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import  Button  from '@mui/material/Button';


const HomeBannerV2 = () => {
  return (
      <Swiper
      
        spaceBetween={30}
        loop={true}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,}}

        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="homeSliderV2"
      >
        <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden relative ">
            <img src="https://serviceapi.spicezgold.com/download/1756273096312_1737036773579_sample-1.jpg" className='w-full'/>

            <div className="info absolute top-0 -right-[100%] w-[50%] h-[100%] opacity-0 z-50 !p-8 flex items-center flex-col justify-center transition-all duration-700">
              <h4 className="text-[18px] font-[500] w-full text-lef !mb-3 relative -right-[100%] opacity-0">Big Saving Days Sale</h4>
              <h2 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0">Women Solid Round Green T-Shirt</h2>
              <h3 className="text-[18px] font-[500] w-full text-lef !mt-3 !mb-3 flex items-center gap-3 relative -right-[100%] opacity-0">Starting At Only<span className='text-[#ff5252] text-[30px] font-[700]'>$59.00</span></h3>
              <div className='w-full relative -right-[100%] opacity-0 btn_'>
                <Button className='btn-org'>SHOP NOW</Button>
              </div>
            </div>

          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden">
            <img src="https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg" className='w-full'/>

            <div className="info absolute top-0 -right-[100%] w-[50%] h-[100%] opacity-0 z-50 !p-8 flex items-center flex-col justify-center transition-all duration-700">
              <h4 className="text-[18px] font-[500] w-full text-lef !mb-3 relative -right-[100%] opacity-0">Big Saving Days Sale</h4>
              <h2 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0">Women Solid Round Green T-Shirt</h2>
              <h3 className="text-[18px] font-[500] w-full text-lef !mt-3 !mb-3 flex items-center gap-3 relative -right-[100%] opacity-0">Starting At Only<span className='text-[#ff5252] text-[30px] font-[700]'>$59.00</span></h3>
              <div className='w-full relative -right-[100%] opacity-0 btn_'>
                <Button className='btn-org'>SHOP NOW</Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        
      </Swiper>

  );
}

export default HomeBannerV2;
