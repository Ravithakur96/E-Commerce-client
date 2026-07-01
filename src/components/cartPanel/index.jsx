import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom'
import { MyContext } from '../../App';

const CartPanel = () => {

  const context = useContext(MyContext);
  console.log("cart panel data", context.cartData);

  const totalAmount = context.cartData?.reduce((total, item) => {
    return total + (item.quantity * (item.productId?.price || 0));
  }, 0);

  return (
    <>
      <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden !py-3 !px-4">

        {context.cartData?.length !== 0 ? (
          context.cartData?.map((item) => (

            <div key={item._id} className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] !pb-4">

              {/* IMAGE */}
              <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                <Link to={`/product/${item.productId?._id}`} className="block group">
                  <img
                    src={item.productId?.images?.[0]}
                    className="w-full h-full object-cover group-hover:scale-105"
                  />
                </Link>
              </div>

              {/* INFO */}
              <div className="info w-[75%] !pr-5 relative">

                <h4 className="text-[14px] font-[500]">
                  <Link
                    to={`/product/${item.productId?._id}`}
                    className="link transition-all"
                  >
                    {item.productId?.name}
                  </Link>
                </h4>

                <p className='flex items-center gap-5 !mt-2 !mb-2'>
                  Qty : <span>{item.quantity}</span>

                  <span className='text-[#ff5252] font-bold'>
                    Price: {(item.productId?.price * item.quantity)
                      ?.toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR'
                      })}
                  </span>
                </p>

                {/* DELETE BUTTON */}
                <MdOutlineDeleteOutline
                  className='absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all'
                  onClick={() => context.removeCartItem(item._id)}
                />

              </div>
            </div>

          ))
        ) : (
          <p className="text-center text-[14px]">Cart Empty 😢</p>
        )}

      </div>

      <br />

      {/* BOTTOM SECTION */}
      <div className="bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden !pr-5">

        <div className="bottomInfo !py-3 !px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex flex-col">

          <div className="flex items-center justify-between w-full">
            <span className='text-[14px] font-[600]'>
              {context.cartData?.length} item(s)
            </span>

            <span className='text-[#ff5252] font-bold'>
              {totalAmount?.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR'
              })}
            </span>
          </div>

          <div className="flex items-center justify-between w-full">
            <span className='text-[14px] font-[600]'>Shipping</span>

            <span className='text-[#ff5252] font-bold'>
              {(8 * context.cartData?.length)
                ?.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR'
                })}
            </span>
          </div>
        </div>

        <div className="bottomInfo !py-3 !px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex flex-col">

          <div className="flex items-center justify-between w-full">
            <span className='text-[14px] font-[600]'>Total</span>

            <span className='text-[#ff5252] font-bold'>
              {(totalAmount + 8 * context.cartData?.length)
                ?.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR'
                })}
            </span>
          </div>

          <br />

          <div className="flex items-center justify-between w-full gap-5">
            <Link to='/cart' className="w-[50%]">
              <Button className='btn-org btn-lg w-full'>View Cart</Button>
            </Link>

            <Link to='/checkout' className="w-[50%]">
              <Button className='btn-org btn-border btn-lg w-full'>Checkout</Button>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}

export default CartPanel;
