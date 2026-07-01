import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoTriangleDown } from 'react-icons/go';
import Rating from '@mui/material/Rating';

const CartItems = ({ item, onRemove, onUpdate }) => {

  const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
  const[selectedSize, setSelectedSize] = useState(item.size)
  const openSize = Boolean(sizeAnchorEl);

  const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
  const[selectedQty, setSelectedQty] = useState(item.quantity)
  const openQty = Boolean(qtyAnchorEl);


const handleClickSize = (event) => {
    setSizeAnchorEl(event.currentTarget);
};
const handleCloseSize = (value) => {
    setSizeAnchorEl(null);
    if (value) {
      setSelectedSize(value);
      onUpdate(item._id, { size: value });
    }
  };

const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
};
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if (value) {
      setSelectedQty(value);
      onUpdate(item._id, { qty: value });
    }
  };


  return (
     <div className="cartItem w-full !p-3 flex items-center gap-4 !pb-5 border-b border-[rgba(0,0,0,0.1)]">
                    <div className="img w-[15%] rounded-md overflow-hidden">
                          <Link to={`/product/${item.productId}`} className='group'>
          <img
            src={item.image} className='w-full group-hover:scale-105 trasition-all'/>
                        
                        </Link>
                    </div>

                    <div className="info w-[85%] relative">
                        <IoClose className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' onClick={() => onRemove(item._id)}/>
                        <span className='text-[13px]'>{item.brand}</span>
                        <h3 className='text-[15px]'>
                            <Link className='link'>{item.productId?.name}</Link></h3>
                            <Rating name="size-small" value={item.rating} size="small" readOnly />

                            <div className="flex items-center gap-4 mt-2">
                            <div className='relative'>
                            <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] !py-1 !px-2 rounded-md cursor-pointer" onClick={handleClickSize}>Size: {selectedSize} <GoTriangleDown/> </span>
       <Menu
        id="size-menu"
        anchorEl={sizeAnchorEl}
        open={openSize}
        onClose={()=>handleCloseSize(null)}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {item.productId?.availableSizes?.map((size) => (
          <MenuItem key={size} onClick={() => handleCloseSize(size)}>
            {size}
          </MenuItem>
        ))}

      </Menu>
      
                            </div>

                            <div className='relative'>
                            <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] !py-1 !px-2 rounded-md cursor-pointer" onClick={handleClickQty}>Qty: {selectedQty}<GoTriangleDown /> </span>
                            
                            <Menu
        id="size-menu"
        anchorEl={qtyAnchorEl}
        open={openQty}
        onClose={()=>handleCloseQty(null)}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={()=>handleCloseQty(1)}>1</MenuItem>
        <MenuItem onClick={()=>handleCloseQty(2)}>2</MenuItem>
        <MenuItem onClick={()=>handleCloseQty(3)}>3</MenuItem>
        <MenuItem onClick={()=>handleCloseQty(4)}>4</MenuItem>
        <MenuItem onClick={()=>handleCloseQty(5)}>5</MenuItem>
        <MenuItem onClick={()=>handleCloseQty(6)}>6</MenuItem>
        <MenuItem onClick={()=>handleCloseQty(7)}>7</MenuItem>
        <MenuItem onClick={()=>handleCloseQty(8)}>8</MenuItem>
        <MenuItem onClick={()=>handleCloseQty(9)}>9</MenuItem>
        <MenuItem onClick={()=>handleCloseQty(10)}>10</MenuItem>

      </Menu>
                            
                            
                            </div>
                            
                            </div>

                            <div className="flex items-center gap-4 !mt-2">

            <span className="price text-[15px] font-[600]">{item.productId?.price?.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR'
              })}</span>
            <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">₹{item.oldPrice?.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR'
              })}</span>
            
            <span className="price text-primary text-[15px] font-[600]"> {item.discount}% OFF</span>
        </div>

                    </div>
                    </div>
  );
}

export default CartItems;
