import React, { useContext } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineShoppingCart } from "react-icons/md";
import { MyContext } from '../../App';


const ProductItem = () => {
    const Context = useContext(MyContext);
  return (
    <div className='productItem rounded-md overflow-hidden border !border-[rgba(0,0,0,0.1)] shadow-lg flex items-center bg-[#f1f1f1]'>
      
      
      <div className="group imgWrapper w-[25%] overflow-hidden rounded-md relative z-0 !p-5 ">
        <Link to ='/'>
          <div className="img h-[220px] overflow-hidden relative">
            <img 
              src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg" 
              alt="Product"
              className="w-full"
            />

            <img 
              src="https://serviceapi.spicezgold.com/download/1753722939207_5107b7b1-ba6d-473c-9195-8576a6a0a9611749366193848-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-3.jpg" 
              alt="Product Hover"
              className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100"
            />
          </div>
        </Link>

        <span className="discount absolute top-[10px] left-[10px] z-20 bg-[#ff5252] text-white rounded-lg !px-2 !py-1 text-[12px] font-[500]">
          10%
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-20 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px]">
          
          <Tooltip title="View Details" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] "  onClick={()=>Context.setOpenProductDetailsModel(true)}>
              <MdZoomOutMap className="text-[18px] text-black" />
            </Button>
          </Tooltip>

          <Tooltip title="Compare" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252]">
              <IoIosGitCompare className="text-[18px] text-black" />
            </Button>
          </Tooltip>

          <Tooltip title="Wishlist" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252]">
              <FaRegHeart className="text-[18px] text-black" />
            </Button>
          </Tooltip>

        </div>
      </div>

      {/* Info Section */}
      <div className="info relative z-30 !p-3 !py-5 !px-8 !bg-[#f1f1f1] w-[75%] ">
        <h6 className="text-[15px] !font-[400]">
          <Link to ='/' className="link transition-all">Flying Machine</Link>
        </h6>

        <h3 className="text-[18px] tittle! !mt-3 !mb-3 font-[500] text-[#000]">
          <Link to ='/' className="link transition-all">
            Women Wide Leg High-Rise Light Fade Stretchable Jeans
          </Link>
        </h3>

        <p className='text-[14px] !mb-3'>We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charams of pleasure of the moment, so blined by desire thet they cannot.</p>

        <Rating name="size-small" defaultValue={2} size="small" readOnly />

        <div className="flex items-center gap-4 mt-1">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">$58.00</span>
          <span className="price text-primary text-[15px] font-[600]">$50.00</span>
        </div>

        <div className="!mt-3">
          <Button className='btn-org flex gap-2'>
            <MdOutlineShoppingCart className='text-[20px]'/>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
