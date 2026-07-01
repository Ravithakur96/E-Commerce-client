import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem';

const ProductsSlider = (props) => {
    return (
    <div className='productsSlider'>

        <Swiper
  key={props?.data?.length}   // 🔥 THIS IS THE FIX
  slidesPerView={props.items}
  spaceBetween={10}
  modules={[Navigation]}
  navigation={true}
  className="mySwiper"
>

                {
                    props?.data?.map((item,index)=>{
                        return(
                        <SwiperSlide key={index}>
                    <ProductItem item={item}/>
                </SwiperSlide>
                        )
                    })
                }
                

             
                </Swiper>
    </div>
    );
}

export default ProductsSlider;
