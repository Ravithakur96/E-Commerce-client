import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";
import ProductsSlider from "../../components/ProductSlider";
import ProductDetailsComponent from "../../components/ProductDetails";
import { fetchDataFromApi } from "../../utils/api";
import { CircularProgress } from "@mui/material";
import { Review } from "./review";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const[relatedProductData, setRelatedProductData] = useState([]);

  const { id } = useParams();

  const reviewsSec = useRef();

  useEffect(() => {
    setIsLoading(true);

    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setProductData(res?.product);
        fetchDataFromApi(
  `/api/product/getAllProductsBySubCatId/${res?.product?.subCatId}`
)
.then((relatedRes) => {
          if(relatedRes?.error === false){
            const filteredProducts = relatedRes?.products?.filter(
              (item) => item._id !== id
            ) || [];
            setRelatedProductData(filteredProducts);
          }
        })
      }
      console.log(res);
      setIsLoading(false);
    });


  

    window.scrollTo(0, 0);
  }, [id]);


  useEffect(() => {
  const getReviewCount = async () => {
    const res = await fetchDataFromApi(
      `/api/user/getReviews?productId=${id}`
    );

    if (res?.error === false) {
      setReviewsCount(res?.data?.length || 0);
    }
  };

  getReviewCount();
}, [id]);

const gotoReviews = () => {
  window.scrollTo({
    top: reviewsSec?.current?.offsetTop - 100 || 0,
    behavior: "smooth",
  });
  setActiveTab(1);
};

  return (
    <section className="bg-white !py-5">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="container flex gap-8 items-center">
            <div className="!w-[40%]">
              <ProductZoom images={productData?.images} />
            </div>

            <div className="!w-[60%] !pr-10 !pl-5">
              <ProductDetailsComponent item={productData}  reviewsCount={reviewsCount} gotoReviews={gotoReviews}/>
            </div>
          </div>

          <div className="container !pt-10">
            <div className="flex gap-8 !mb-5">
              <span
                className={`cursor-pointer ${activeTab === 0 && "text-[#ff5252]"}`}
                onClick={() => setActiveTab(0)}
              >
                Description
              </span>

              <span
                className={`cursor-pointer ${activeTab === 1 && "text-[#ff5252]"}`}
                onClick={() => setActiveTab(1)}
                ref={reviewsSec}
              >
                Reviews ({reviewsCount})
              </span>
            </div>

            {activeTab === 0 && (
              <div className="shadow-md !p-5">
                {productData?.description}
              </div>
            )}

            {activeTab === 1 && (
              <div className="shadow-md !p-5 w-[80%]">
                <Review
                  productId={productData?._id}
                  onReviewAdded={(count) => setReviewsCount(count)}
                />
              </div>
            )}
          </div>

          {
            relatedProductData?.length > 0 && (
              <div className="container !mt-8">
                <h2 className="text-[20px] font-[600]">Related Products</h2>
                <ProductsSlider items={6} data={relatedProductData} />
              </div>
            )
          }


        </>
      )}
    </section>
  );
};

export default ProductDetails;
