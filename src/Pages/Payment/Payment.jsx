import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import { Button } from "@mui/material";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { postData } from "../../utils/api";
import { deleteData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const subtotal =
    context.cartData?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0;

  const shipping = 0;
  const total = subtotal + shipping;



  const loadScript=(src)=>{

return new Promise((resolve)=>{

const script=document.createElement("script");

script.src=src;

script.onload=()=>resolve(true);

script.onerror=()=>resolve(false);

document.body.appendChild(script);

})

}

const selectedAddress = context.addressData?.find(
  item => item._id === context.selectedAddress
);

const handlePayment = async () => {

  if (paymentMethod === "cod") {

  const order = await postData("/api/orders/create", {
    paymentId: "",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    delivery_address: context.selectedAddress,
  });

  if (!order.success) {
    alert(order.message);
    return;
  }

  await deleteData("/api/cart/clear");

  context.getCartItems();

  alert("Order Placed Successfully");

  navigate("/my-orders");

  return;
}
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if(!res){
      alert("Razorpay SDK Failed");
      return;
  }

  const orderRes = await postData(
      "/api/payment/create-order",
      {
          amount: total
      }
  );

  if(!orderRes.success){
      alert("Unable to create order");
      return;
  }

  const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY,

      amount: orderRes.order.amount,

      currency: orderRes.order.currency,

      order_id: orderRes.order.id,

      name: "Your Ecommerce",

      description: "Product Payment",

      handler: async function (response) {

  const order = await postData("/api/orders/create", {
    paymentId: response.razorpay_payment_id,
    paymentMethod: "ONLINE",
    paymentStatus: "Paid",
    delivery_address: context.selectedAddress,
  });

  if (!order.success) {
    alert(order.message);
    return;
  }

  await deleteData("/api/cart/clear");

  context.getCartItems();

  alert("Payment Successful");

  navigate("/my-orders");
},

      prefill:{

          name:context.userData?.name || "",

          email:context.userData?.email || "",

          contact:selectedAddress?.mobile || ""

      },

      theme:{
          color:"#2563eb"
      }

  }

  const paymentObject=new window.Razorpay(options);

  paymentObject.open();

}




  return (
    <section className="py-10 bg-gray-100 min-h-screen">
      <div className="container mx-auto flex gap-6">

        {/* Left */}

        <div className="w-[65%] bg-white rounded-lg shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Select Payment Method
          </h2>

          <div
            className={`border rounded-lg p-4 cursor-pointer mb-4 ${
              paymentMethod === "razorpay"
                ? "border-green-600"
                : ""
            }`}
            onClick={() => setPaymentMethod("razorpay")}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                checked={paymentMethod === "razorpay"}
                readOnly
              />

              <SiRazorpay
                size={25}
                className="text-blue-700"
              />

              <div>
                <h4 className="font-semibold">
                  Razorpay
                </h4>

                <p className="text-gray-500 text-sm">
                  UPI, Cards, Wallets, Net Banking
                </p>
              </div>
            </div>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer ${
              paymentMethod === "cod"
                ? "border-green-600"
                : ""
            }`}
            onClick={() => setPaymentMethod("cod")}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                readOnly
              />

              <FaMoneyBillWave
                size={22}
                className="text-green-600"
              />

              <div>
                <h4 className="font-semibold">
                  Cash On Delivery
                </h4>

                <p className="text-gray-500 text-sm">
                  Pay after receiving your order
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right */}

        <div className="w-[35%]">

          <div className="bg-white rounded-lg shadow p-6 sticky top-5">

            <h2 className="text-xl font-bold mb-5">
              Order Summary
            </h2>

            {context.cartData?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between py-2 border-b"
              >
                <div>
                  <h5>{item.productTitle}</h5>

                  <span className="text-sm text-gray-500">
                    Qty : {item.quantity}
                  </span>
                </div>

                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

            <div className="flex justify-between mt-5">
              <span>Subtotal</span>

              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Shipping</span>

              <span className="text-green-600">
                FREE
              </span>
            </div>

            <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
              <span>Total</span>

              <span>₹{total}</span>
            </div>

            <Button
              fullWidth
              className="btn-org mt-6"
              onClick={handlePayment}
            >
              <FaCreditCard className="mr-2" />
              Pay ₹{total}
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Payment;