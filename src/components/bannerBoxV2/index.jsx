import React from 'react'
import './style.css'
import { Link } from '@mui/material';

const BannerBoxV2 =(props) =>{
return(
        <div className="bannerBoxV2 w-full overflow-hidden rounded-md group relative"> 
            <img src = {props.image} className="w-full transition-al duration-150 group-hover:scale-105"/>
            
            <div className={`info absolute !p-5 top-0 ${props.info ==="left" ? 'left-0' : 'right-0'} w-[70%] h-[100%] z-50 felx items-center justify-center flex-col gap-2 ${props.info==="left" ? "" : '!pl-15' }`}>
                <h2 className='text-[18px] font-[600] w-full'>Buy Apple Iphone</h2>
                <span className="text-[20px] text-[#ff5252]">$550</span>
                <div className="w-full">
                    <Link to ="/" className="text-[16px] font-[600] link !text-[#000]">SHOP NOW</Link>
                </div>
            </div>

        </div>
    )
}

export default BannerBoxV2;