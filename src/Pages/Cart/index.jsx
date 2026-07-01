import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { BsFillBagCheckFill } from "react-icons/bs";
import { MyContext } from '../../App';
import CartItems from './cartItems';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const CartPage = () => {

const context = useContext(MyContext);

console.log("Cart Data:", context.cartData);

  // subtotal
  const subTotal = context.cartData?.reduce((total, item) => {
    return total + (item.quantity * (item.productId?.price || 0));
  }, 0);

  // shipping logic
  const shipping = subTotal > 0 ? 0 : 0;

  const total = subTotal + shipping;

  const placeOrder = () => {
  if (!context.selectedAddress) {
    context.openAlertBox("error", "Please select an address");
    return;
  }
  Navigate("/checkout");
}

  return (
    <section className='section !py-10 !pb-10'>
      <div className="container w-[80%] max-w-[80%] flex gap-5">

        {/* LEFT PART */}
        <div className="leftPart w-[70%]">

          <div className="shadow-md rounded-md bg-white">

            <div className="!py-2 !px-3 border-b border-[rgba(0,0,0,.1)]">
              <h2>Your Cart</h2>

              <p className='!mt-0'>
                There are{" "}
                <span className='font-bold text-[#ff5252]'>
                  {context.cartData?.length || 0}
                </span>{" "}
                products in your cart
              </p>
            </div>

            {/* CART ITEMS */}
            {
              context.cartData?.length > 0 ? (
                context.cartData.map((item) => (
                  <CartItems key={item._id} item={item} />
                ))
              ) : (
                <p className='text-center !p-10 text-gray-500'>
                  Your cart is empty 😢
                </p>
              )
            }

          </div>
        </div>


        {/* RIGHT PART */}
        <div className="rightPart w-[30%]">

          <div className="shadow-md rounded-md bg-white !p-5">

            <h3 className='!pb-3'>Cart Total</h3>
            <hr />

            <p className='flex items-center justify-between'>
              <span className='text-[14px] font-[500]'>Subtotal</span>
              <span className='text-[#ff5252] font-bold'>
                {subTotal.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR'
                })}
              </span>
            </p>

            <p className='flex items-center justify-between'>
              <span className='text-[14px] font-[500]'>Shipping</span>
              <span className='font-bold'>
                {shipping === 0 ? "Free" : shipping}
              </span>
            </p>

            <p className='flex items-center justify-between'>
              <span className='text-[14px] font-[500]'>Estimate for</span>
              <span className='font-bold'>India</span>
            </p>

            <p className='flex items-center justify-between'>
              <span className='text-[14px] font-[500]'>Total</span>
              <span className='text-[#ff5252] font-bold'>
                {total.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR'
                })}
              </span>
            </p>

            <br />

            <Link to='/checkout'>
              <Button
                disabled={context.cartData?.length === 0}
                className='btn-org btn-lg w-full flex gap-2' onClick={placeOrder}
              >
                <BsFillBagCheckFill className='text-[20px]' />
                Checkout
              </Button>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}

export default CartPage;
