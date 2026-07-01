import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home/Index";
import ProductListing from "./Pages/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPage from "./Pages/Cart";
import Verify from "./Pages/Verify";

import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount"; 
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";

import ProductZoom from "./components/ProductZoom";
import ProductDetailsComponent from "./components/ProductDetails";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { IoClose } from "react-icons/io5";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi, postData, putData } from "./utils/api";
import Address from "./Pages/MyAccount/address";
import Payment from "./Pages/Payment/Payment";
import ForgotPassword from "./Pages/forgotPassword";

export const MyContext = createContext();

function App() {
  const [addressData, setAddressData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [refreshAddress, setRefreshAddress] = useState(false);
  const [openProductDetailsModel, setOpenProductDetailsModel] = useState({
    open:false,
    items:{}
  });
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]); 
  


  const handleOpenProductDetailsModel = (status, item) => {
  setOpenProductDetailsModel({
    open: status,
    item: item
  });
};



const handleCloseProductDetailsModel = () => {
  setOpenProductDetailsModel({
    open: false,
    item: {}
  });
};



  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };


  const openAlertBox = (status, msg) => {
    if (status === "success") toast.success(msg);
    else if (status === "error") toast.error(msg);
  };

useEffect(() => {
  const token = localStorage.getItem("accesstoken");

  if (!token) {
    setIsLogin(false);
    setUserData(null);
    return;
  }

  fetchDataFromApi("/api/user/user-details")
    .then((res) => {
      if (res?.data) {
        setUserData(res.data);
        setIsLogin(true);
        getCartItems();
      } else {
        // Backend returned no data → token invalid
        setIsLogin(false);
        setUserData(null);
        localStorage.removeItem("accesstoken"); // remove expired token
      }
    })
    .catch(() => {
      setIsLogin(false);
      setUserData(null);
      localStorage.removeItem("accesstoken"); // remove expired token
    });
}, []);



useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
    });
  }, []);


  const addToCart = (product, userId, quantity, selectedSize = null) => {
    if(userId===undefined || userId===null){
      openAlertBox("error", "Please login to add product in cart");
      
      return; 
    }

    const data = {
  productTitle: product?.name,
  image: product?.images[0],
  rating: product?.rating,
  price: product?.price,
  quantity: quantity,
  subTotal: parseInt(product?.price * quantity),
  productId: product?._id,
  countInStock: product?.countInStock,
  discount: product?.discountPercentage,
  oldPrice: product?.oldPrice,
  brand: product?.brand,
  size: selectedSize,
  weight: product?.weight,
  ram: product?.productRam?.[0] || "",
} 
    postData("/api/cart/add", data)
      .then((res) => {
        if (res?.error === false) {
          openAlertBox("success", res?.message || "Product added to cart successfully!");
        } else {
          openAlertBox("error", res?.message || "Item is already in cart.");
        }

        getCartItems();

       
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        openAlertBox("error", "An error occurred while adding to cart.");
      });
  }


const getCartItems = () => {
  fetchDataFromApi(`/api/cart/get`)
    .then((res) => {
      console.log("Cart API Response:", res);

      if (res?.error === false) {
        setCartData(res?.data);
      }
    })
    .catch((err) => {
      console.log("Cart API Error:", err);
    });
};



const updateCartQty = async (_id, qty) => {
  try {
    const res = await putData("/api/cart/update-qty", {
      _id,
      qty,
    });

    if (res?.error === false) {
      openAlertBox("success", res?.message || "Cart updated successfully!");
      getCartItems();
    }
  } catch (error) {
    console.log(error);
  }
};



const getAddress = async () => {
  const res = await fetchDataFromApi("/api/address");

  if (res.success) {
    setAddressData(res.data);

    if (res.data.length > 0) {
      const defaultAddress =
        res.data.find(item => item.status === true) || res.data[0];

      setSelectedAddress(defaultAddress._id);
    }
  }
};

useEffect(() => {
  if (userData?._id) {
    getAddress();
  }
}, [userData, refreshAddress]);



  // ✅ Global Context values
const values = {
  handleOpenProductDetailsModel,
  setOpenProductDetailsModel,
  setOpenCartPanel,
  toggleCartPanel,
  openCartPanel,
  openAlertBox,
  isLogin,
  setIsLogin,
  userData,
  setUserData,
  catData,
  setCatData,
  addToCart,
  cartData,
  setCartData,
  updateCartQty,
  getCartItems,  addressData,
  setAddressData,

  selectedAddress,
  setSelectedAddress,

  refreshAddress,
  setRefreshAddress,

  getAddress
};




  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productListing" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/my-orders" element={<Orders />} />
            <Route path={"/address"} exact={true} element={<Address />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      

      {/* ✅ Toast Notification */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* ✅ Product Details Modal */}
      <Dialog
        open={openProductDetailsModel.open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        keepMounted
        onClose={handleCloseProductDetailsModel}
        aria-describedby="alert-dialog-slide-description"
        className="ProductDetailsModel"
      >
        <DialogContent>
          <div className="flex items-center w-full ProductDetailsModelContainer relative">
            <Button
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]"
              onClick={handleCloseProductDetailsModel}
            >
              <IoClose className="text-[20px]" />
            </Button>
            {
              openProductDetailsModel?.item?.length!==0 && 
              <>
              <div className="col1 w-[40%] !px-3 !py-8">
              <ProductZoom images={openProductDetailsModel?.item?.images}/>
            </div>

            <div className="col2 w-[60%] !px-8 !py-8 !pr-16 productContent">
              <ProductDetailsComponent item={openProductDetailsModel?.item}/>
            </div></>

            }

            
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
