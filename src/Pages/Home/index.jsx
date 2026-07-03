import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductsSlider from "../../components/ProductSlider";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import BlogItem from "../../components/BlogItem";
import HomeBannerV2 from "../../components/HomeSliderV2";

import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import BannerBoxV2 from "../../components/bannerBoxV2";


const Home = () => {

  const [value, setValue] = useState(0);
  const [popularProductData, setPopularProductData] = useState([]);
  const [productsData, setAllProductsData] = useState([]);
  const [featuredProducts,setFeaturedProducts] = useState([]);
  const context = useContext(MyContext);

  // ✅ Initial Load (first category)
  useEffect(() => {

    window.scrollTo(0,0);

    if(context?.catData?.length !== 0){
      fetchDataFromApi(
        `/api/product/getAllProductsByCatId/${context.catData[0]._id}`
      ).then((res)=>{
        if(res?.error === false){
          setPopularProductData(res?.products);
        }
      })
    }

  }, [context?.catData]);


useEffect(() => {
  fetchDataFromApi("/api/product/getAllProducts")
    .then((res) => {
      if (res?.error === false) {
        setAllProductsData(res?.products || []);
      }
    });

    fetchDataFromApi("/api/product/getAllFeaturedProducts")
    .then((res) => {
      if (res?.error === false) {
        setFeaturedProducts(res?.products || []);
      }
    });
}, []);


  // ✅ Filter function
  const filterByCatId = (id) => {

    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${id}`
    ).then((res)=>{
      if(res?.error === false){
        setPopularProductData(res?.products);
      }
    })

  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>

      <HomeSlider />

      <section className="!py-6">
        <div className="container flex gap-5">

          <div className="part1 w-[70%]">
            <HomeBannerV2 />
          </div>

          <div className="part2 w-[30%] flex items-center gap-5 justify-between flex-col">
            <BannerBoxV2
              info="left" 
              image="https://img.magnific.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321996.jpg?semt=ais_hybrid&w=740&q=80" 
            />
            <BannerBoxV2 
              info="right" 
              image="https://img.magnific.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321996.jpg?semt=ais_hybrid&w=740&q=80" 
            />
          </div>

        </div>
      </section>

      {/* Category Slider */}
      {
        context?.catData?.length !== 0 &&  
        <HomeCatSlider data={context?.catData}/>
      }

      {/* ❌ Duplicate hata diya */}

      {/* Popular Products */}
      <section className="bg-white !py-8">
        <div className="container">

          <div className="flex items-center justify-between">

            <div className="leftSec">
              <h2 className="text-[20px] font-[600]">Popular products</h2>
              <p className="text-[14px] font-[400] !mt-0 !mb-0">
                Do not miss the current offers until the end of March
              </p>
            </div>

            <div className="rightSec w-[60%]">

              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {
                  context?.catData?.map((cat)=>(
                    <Tab 
                      key={cat?._id}
                      label={cat?.name}
                      onClick={()=>filterByCatId(cat?._id)}
                    />
                  ))
                }
              </Tabs>

            </div>

          </div>

          {/* ✅ Slider tabs ke bahar */}
          {
            popularProductData?.length !== 0 &&
            <ProductsSlider 
              items={6} 
              data={popularProductData}
            />
          }

        </div>
      </section>

      {/* Free Shipping */}
      <section className="!py-4 pt-2 bg-white">
        <div className="container">

          <div className="freeShiping w-[80%] !m-auto !p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md !mb-7">

            <div className="col1 flex items-center gap-4">
              <LiaShippingFastSolid className="text-[50px]" />
              <span className="text-[20px] font-[600] uppercase">
                Free Shipping
              </span>
            </div>

            <div className="col2">
              <p className="!mb-0 font-[500]">
                Free Delivery Now On Your First Order and over $200
              </p>
            </div>

            <p className="font-bold text-[25px]">- Only $200*</p>

          </div>

          <AdsBannerSliderV2 items={4} />
        </div>
      </section>

      {/* Latest */}
      <section className="!py-5 !pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Latest Products</h2>

          {
            productsData?.length!==0 && <ProductsSlider items={6}  data={productsData}/>
          }
          
          <AdsBannerSlider items={3} />
        </div>
      </section>

      {/* Featured */}
      <section className="!py-5 !pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Featured Products</h2>
           {
            featuredProducts?.length!==0 && <ProductsSlider items={6}  data={featuredProducts}/>
          }
          <AdsBannerSlider items={3} />
        </div>
      </section>

      {/* Blog */}
      <section className="!py-5 !pb-8 !pt-0 bg-white blogSection">
        <div className="container">

          <h2 className="text-[20px] font-[600] !mb-4">
            From The Blog
          </h2>

          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            modules={[Navigation]}
            navigation
          >
            <SwiperSlide><BlogItem/></SwiperSlide>
            <SwiperSlide><BlogItem/></SwiperSlide>
            <SwiperSlide><BlogItem/></SwiperSlide>
            <SwiperSlide><BlogItem/></SwiperSlide>
            <SwiperSlide><BlogItem/></SwiperSlide>
          </Swiper>

        </div>
      </section>

    </div>
  );
};

export default Home;
