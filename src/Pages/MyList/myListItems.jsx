import React from 'react';

import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';

const MyListItems = () => {



  return (
     <div className="cartItem w-full !p-3 flex items-center gap-4 !pb-5 border-b border-[rgba(0,0,0,0.1)]">
                    <div className="img w-[15%] rounded-md overflow-hidden">
                        <Link to = "/product/7845" className='group'>
                        <img src="https://serviceapi.spicezgold.com/download/1753712430060_fireboltt-ninja-call-pro-plus-smart-watch-with-bluetooth-calling-black-digital-o493664720-p597671841-0-202501041659.webp" className='w-full group-hover:scale-105 trasition-all'/>
                        
                        </Link>
                    </div>

                    <div className="info w-[85%] relative">
                        <IoClose className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all'/>
                        <span className='text-[13px]'>Fire-Boltt</span>
                        <h3 className='text-[15px]'>
                            <Link className='link'>FireBoltt Ninja Call Pro Plus Smart Watch with Bluetooth Calling, Black</Link></h3>
                            <Rating name="size-small" defaultValue={2} size="small" readOnly />

                            

                            <div className="flex items-center gap-4 !mt-2 !mb-2">

            <span className="price text-[15px] font-[600]">$50.00</span>
            <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">$58.00</span>
            
            <span className="price text-primary text-[15px] font-[600]">$55% OFF</span>
        </div>



        <Button className="btn-org btn-sm">Add to Cart</Button>

                    </div>
                    </div>
  );
}

export default MyListItems;
