import React from 'react';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import { IoBagCheck } from "react-icons/io5";
import { MyContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

const Checkout = () => {

    const context = useContext(MyContext);
    const navigate = useNavigate();

    const selectedAddress = context.addressData?.find(
  item => item._id === context.selectedAddress
);

console.log("Address Data", context.addressData);
console.log("Selected Address ID", context.selectedAddress);
console.log("Selected Address", selectedAddress);

const subTotal = context.cartData?.reduce(
(acc,item)=>acc+(item.price*item.quantity),
0
);

const shipping=0;

const total=subTotal+shipping;

const placeOrder = () => {
  if (!context.selectedAddress) {
    context.openAlertBox("error", "Please select an address");
    return;
  }
  navigate("/payment");
}

    return (
    <section className='!py-10'>
        
        <div className="container flex gap-5">
            <div className="leftCol w-[70%]">
                <div className="card bg-white shadow-md !p-5 rounded-md w-full">
                <h1>Billing Details</h1>


                <form className='w-full !mt-5'>
                    <div className="flex items-center gap-5 !pt-2 !pb-5">
                        <div className="col w-[50%]">
                            <TextField
  value={context.userData?.name || ""}
  label="Full Name"
  className="w-full"
  size="small"
/>
                        </div>

                    <div className="col w-[50%]">
                    <TextField 
  value={context.userData?.email || ""}
  type='email'
  className='w-full'
  label="Email"
  variant="outlined"
  size="small"
/>
                    </div>
                    </div>

                    <h6 className='text-[14px] font-[500] !mb-3'>Street address *</h6>
                    <div className="flex items-center gap-5 !pb-5">
                    <div className="col w-[100%]">
                        <TextField
  className="w-full"
  label="House No and Street Name"
  size="small"
  value={selectedAddress?.address_line1 || ""}
  InputProps={{ readOnly: true }}
/>
                    </div>

                    </div>

                    <div className="flex items-center gap-5 !pb-5">
                    <div className="col w-[100%]">
                    <TextField
  className="w-full"
  label="Town / City"
  size="small"
  value={selectedAddress?.city || ""}
  InputProps={{ readOnly: true }}
/>
</div>
                    </div>


                    <div className="flex items-center gap-5 !pb-5">
                    <div className="col w-[100%]">
                        <TextField
  className="w-full"
  label="Town / City"
  size="small"
  value={selectedAddress?.city || ""}
  InputProps={{ readOnly: true }}
/>
                    </div>
                    


                    <div className="col w-[100%]">
                       <TextField
  className="w-full"
  label="Country"
  size="small"
  value={selectedAddress?.country || ""}
  InputProps={{ readOnly: true }}
/>
                    </div>
                    </div>

                    <h6 className='text-[14px] font-[500] !mb-3'>Postcode / ZIP *</h6>
                    <div className="flex items-center gap-5 !pb-5">
                    <div className="col w-[100%]">
                    <TextField
  className="w-full"
  label="Pincode"
  size="small"
  value={selectedAddress?.pincode || ""}
  InputProps={{ readOnly: true }}
/>
                    </div>
                    </div>

                    <div className="flex items-center gap-5 !pb-5">
                    <div className="col w-[100%]">
                        <TextField
  className="w-full"
  label="Phone Number"
  size="small"
  value={selectedAddress?.mobile || ""}
  InputProps={{ readOnly: true }}
/>
                    </div>
                    


                    <div className="col w-[100%]">
                        <TextField
  className="w-full"
  label="Email Address"
  size="small"
  value={context.userData?.email || ""}
  InputProps={{ readOnly: true }}
/>
                    </div>
                    </div>
                    
                </form>
                </div>
            </div>



            <div className="rightCol w-[30%]">
                <div className="card shadow-md bg-white !p-5 rounded-md">
                    <h2 className='!mb-4'>Your Order</h2>

                    <div className="flex items-center justify-between !py-3 border-t border-b border-[rgba(0,0,0,0.1)]">
                        <span className='text-[14px] font-[600]'>Product</span>
                        <span className='text-[14px] font-[600]'>Subtotal</span>
                    </div>

                    {
context.cartData?.map((item)=>(

<div
key={item._id}
className="flex items-center justify-between py-2"
>

<div className="part1 flex items-center gap-3">

<div className="img w-[50px] h-[50px] rounded-md overflow-hidden">
<img
src={item.image}
className="w-full h-full object-cover"
/>
</div>

<div>

<h4 className="text-[14px]">
{item.productTitle}
</h4>

<span className="text-[13px]">
Qty : {item.quantity}
</span>

{
item.size &&
<p className="text-[12px]">
Size : {item.size}
</p>
}

{
item.weight &&
<p className="text-[12px]">
Weight : {item.weight}
</p>
}

{
item.ram?.length>0 &&
<p className="text-[12px]">
RAM : {item.ram.join(", ")}
</p>
}

</div>

</div>

<span className="font-semibold">
₹{item.price*item.quantity}
</span>

</div>

))
}

<hr/>

<div className="flex justify-between py-2">
<span>Subtotal</span>
<span>₹{subTotal}</span>
</div>

<div className="flex justify-between py-2">
<span>Shipping</span>
<span>Free</span>
</div>

<div className="flex justify-between py-2 font-bold text-lg">
<span>Total</span>
<span>₹{total}</span>
</div>


                    <Button
disabled={context.cartData.length===0}
className="btn-org btn-lg w-full"
onClick={placeOrder}
>

<IoBagCheck/>

Place Order

</Button>
                    </div>
            </div>
        </div>
    </section>
    );
}

export default Checkout;




