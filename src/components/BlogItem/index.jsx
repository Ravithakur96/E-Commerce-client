import React from 'react';
import { IoMdTime } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from "react-icons/md";

const BlogItem = () => {
  return (
        <div className="blogItems group">
            <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointe relative">
            <img src="https://serviceapi.spicezgold.com/download/1750304462017_1000005912.jpg" className='w-[full] transition-all group-hover:scale-105 group-hover:rotate-1' alt='blog image'/>

            <span className='flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 !bg-[#ff5252] rounded-md !p-1 text-[11px] font-[500] gap-1'><IoMdTime className='text-[16px]'/> 3 SEPTEMBER 2025</span>

        </div>
        
        <div className="info !py-4">
            <h2 className='text-[15px] font-[600] text-black' >
                <Link to ='/' className='link'>Sustainable living through cutting-edge prefabricated homes</Link>
            </h2>
            <p className='text-[13px] font-[400] text-[rgba(0,0,0,0.8)] !mb-4'>Give 2 lady of  they such they sure it. Me contained explained my education. Vulgar...</p>

            <Link  className='link font-[500] text-[14px] flex items-center gap-1'>Read More <MdOutlineArrowForwardIos /></Link>
        </div>


    </div>
  );
}

export default BlogItem;
