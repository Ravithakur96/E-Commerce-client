import React, { useContext, useEffect, useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { MyContext } from '../../App';


const ProductItem = (props) => {

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const Context = useContext(MyContext);




const handleClickActiveTab = (index, size) => {
  setActiveTab(index);
  setSelectedSize(size);
};




useEffect(() => {
  console.log("Cart Data:", Context.cartData);

  const item = Context.cartData.find(
    i => i.productId?._id === props.item._id || i.productId === props.item._id
  );

  console.log("Matched Item:", item);

  if (item) {
    setIsAdded(true);
    setQuantity(item.quantity);
    setCartItem(item);
  } else {
    setIsAdded(false);
    setQuantity(1);
    setCartItem(null);
  }
}, [Context.cartData, props.item._id]);



const minusQty = () => {
  if (!cartItem) return;

  if (quantity > 1) {
    const newQty = quantity - 1;
    setQuantity(newQty);
    Context.updateCartQty(cartItem._id, newQty);
  } else {
    // REMOVE ITEM FROM CART
    fetch(`${import.meta.env.VITE_API_URL}/api/cart/delete-cart-item`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`
      },
      body: JSON.stringify({
        _id: cartItem._id
      })
    }).then(() => {
      Context.getCartItems();   // refresh cart
      Context.openAlertBox("success", "Item removed from cart successfully!"); // show success message
    });
  }
};




const addQty = () => {
  if (!cartItem) return;

  const newQty = quantity + 1;
  setQuantity(newQty);
  Context.updateCartQty(cartItem._id, newQty);
};








  return (
    <div className='productItem rounded-md overflow-hidden border border-[rgba(0,0,0,0.1)] shadow-lg'>

      {/* Image Section */}
      <div
  className="group imgWrapper w-full overflow-hidden rounded-md relative !z-0"
  onMouseEnter={() => {
    if (props?.item?.size?.length > 0) setIsShowTabs(true);
  }}
  onMouseLeave={() => setIsShowTabs(false)}
>
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img h-[220px] overflow-hidden relative">
            <img
              src={props?.item?.images[0]}
              alt="Product"
              className="w-full"
            />

            <img
              src={props?.item?.images[1]}
              alt="Hover"
              className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100"
            />
          </div>
        </Link>


        {
          isShowTabs === true && 
          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] gap-2">

          {
            props?.item?.size?.length!==0 && props?.item?.size?.map((size, index) => (<span key={index} className={`flex items-center justify-center !p-1 !px-2 bg-[rgba(255,555,255,0.8)]  !h-[25px] !max-w-[35px]  rounded-sm cursor-pointer hover:bg-white ${activeTab === index ? '!bg-[#ff5252] !text-white' : ''}`} 
           onClick={() => handleClickActiveTab(index, size)}
            >{size}</span> ))
          }

        </div>
        }

        

        {/* Discount */}
        <span className="discount absolute top-[10px] left-[10px] !z-20 bg-[#ff5252] text-white rounded-lg !px-2 !py-1 text-[12px] !font-[500]">
          {props?.item?.discount}%
        </span>

        {/* Action Buttons */}
        <div className="actions absolute top-[-200px] right-[5px] !z-20 flex flex-col gap-2 w-[50px] transition-all duration-300 group-hover:top-[15px]">

          <Tooltip title="View Details" placement="left-start">
            <Button
              className="!w-[35px] !h-[35px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252]"
              onClick={() => Context.handleOpenProductDetailsModel(true, props?.item)}
            >
              <MdZoomOutMap className="!text-[18px]" />
            </Button>
          </Tooltip>

          <Tooltip title="Compare" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !min-w-[30px] !rounded-full !bg-white hover:!bg-[#ff5252]">
              <IoIosGitCompare className="!text-[18px] !text-black" />
            </Button>
          </Tooltip>

          <Tooltip title="Wishlist" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !min-w-[30px] !rounded-full !bg-white hover:!bg-[#ff5252]">
              <FaRegHeart className="!text-[18px] !text-black" />
            </Button>
          </Tooltip>

        </div>
      </div>

      {/* Info Section */}
      <div className="info relative !z-30 !p-3 !pt-4 !pb-[70px] !bg-[#f1f1f1]">

        <h6 className="!text-[13px] !font-[400]">
          <span className="link transition-all">{props?.item?.brand}</span>
        </h6>

        <h3 className="!text-[13px] title mt-1 !font-[500] mb-1 !text-black">
          <Link to={`/product/${props?.item?._id}`} className="link transition-all">
            {props?.item?.name?.substr(0, 40) + '...'}
          </Link>
        </h3>

        <Rating
          name="size-small"
          defaultValue={props?.item?.rating}
          size="small"
          readOnly
        />

        <div className="flex items-center gap-4 !mt-1">
          <span className="oldPrice line-through !text-gray-500 !text-[15px] !font-[500]">
            ₹ {props?.item?.price}
          </span>
          <span className="price !text-[#ff5252] !text-[15px] !font-[600]">
            ₹ {props?.item?.oldPrice}
          </span>
        </div>

        {/* Add to Cart */}
        <div className="!absolute !bottom-[15px] !left-0 !w-full !pl-3 !pr-3 !z-40">
          {
            isAdded === false ? <Button
  className="btn-org btn-border !flex !w-full btn-sm !gap-2"
  size="small"
 onClick={() => {
  // PRODUCT HAS SIZE
  if (props?.item?.size?.length > 0) {

    // size not selected yet
    if (!selectedSize) {
      setIsShowTabs(true);
      Context.openAlertBox("error", "Please select size first!");
      return;
    }

    // size selected → add to cart
    Context.addToCart(
      props.item,
      Context.userData._id,
      quantity,
      selectedSize
    );

    setIsShowTabs(false);

  } else {
    // NO SIZE PRODUCT
    Context.addToCart(
      props.item,
      Context.userData._id,
      quantity
    );
  }
}}

>
  <MdOutlineShoppingCart className="!text-[18px]" />
  Add to Cart
</Button> :
<div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)]">
  <Button
    className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-none !bg-white !text-black hover:!bg-[#ff5252]"
    onClick={minusQty}
  >
    <FaMinus className="!text-[14px]" />
  </Button>
  <span className="!text-[14px] !font-[500] mx-2">{quantity}</span>
  <Button
    className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-none !bg-[#ff5252] !text-black"
    onClick={addQty}
  >
    <FaPlus className="!text-[14px]" />
  </Button>
</div>
          }
          
        



        </div>

      </div>
    </div>
  );
};

export default ProductItem;
