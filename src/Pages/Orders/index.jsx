import React from "react";
import AccountSlidebar from "../../components/AccountSidebar";
import  Button  from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/Badge";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Orders = () => {
  
  const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
  const[isOpenOrderdProduct,setIsOpenOrderdProduct] = useState(null)

  const isShowOrderesProduct=(index)=>{
    if(isOpenOrderdProduct === index){
      setIsOpenOrderdProduct(null);
    }
    else{

      setIsOpenOrderdProduct(index);
    }
  };

  const getMyOrders = async () => {
  try {
    const token = localStorage.getItem("accesstoken");

const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    if (res.data.success) {
      setOrders(res.data.orders);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getMyOrders();
}, []);
  
  return (
    <section className="!py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSlidebar />
        </div>

        <div className="col2 w-[80%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="!py-2 !px-3 border-b border-[rgba(0,0,0,..1)]">
              <h2>My Orders</h2>
              <p className="!mt-0">
                There are{" "}
<span className="font-bold text-[#ff5252]">
  {orders.length}
</span>{" "}
orders
              </p>
              <div className="relative overflow-x-auto !mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
  <tr>
    <th>&nbsp;</th>
    <th>Order Id</th>
    <th>Payment Method</th>
    <th>Total Products</th>
    <th>Product Name</th>
    <th>Phone Number</th>
    <th>Address</th>
    <th>Pincode</th>
    <th>Total Amount</th>
    <th>User Id</th>
    <th>Order Status</th>
    <th>Date</th>
  </tr>
</thead>
                  <tbody>
  {orders.map((order, index) => (
    <React.Fragment key={order._id}>
      <tr>
        <td>
          <Button onClick={() => isShowOrderesProduct(index)}>
            {isOpenOrderdProduct === index ? (
              <FaAngleUp />
            ) : (
              <FaAngleDown />
            )}
          </Button>
        </td>

        <td>{order.orderId}</td>

<td>{order.paymentMethod}</td>

<td>{order.orderItems.length}</td>

<td>
  {order.orderItems.map(item => item.product_details.name).join(", ")}
</td>

<td>{order.delivery_address?.mobile}</td>

<td>
  {order.delivery_address?.address_line1},
  {order.delivery_address?.city},
  {order.delivery_address?.state},
  {order.delivery_address?.country}
</td>

<td>{order.delivery_address?.pincode}</td>

<td>₹{order.totalAmt}</td>

<td>{order.userId}</td>

<td>
  <Badge status={order.orderStatus.toLowerCase()} />
</td>

<td>{new Date(order.createdAt).toLocaleDateString()}</td>
      </tr>

      {isOpenOrderdProduct === index && (
        <tr>
          <td colSpan="13">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Sub Total</th>
                </tr>
              </thead>

              <tbody>
                {order.orderItems.map((item) => (
  <tr key={item._id}>
    <td>{item.productId}</td>

    <td>{item.product_details.name}</td>

    <td>
      <img
        src={item.product_details.image?.[0]}
        className="w-12 h-12 object-cover rounded"
      />
    </td>

    <td>{item.quantity}</td>

    <td>₹{item.price}</td>

    <td>₹{item.subTotal}</td>
  </tr>
))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  ))}
</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
