import React from "react";
import AccountSlidebar from "../../components/AccountSidebar";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from "react";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import { FaRegTrashAlt } from "react-icons/fa";
import FormControl from "@mui/material/FormControl";

const Address = () => {
  const context = useContext(MyContext);
  const [status, setStatus] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [phone, setPhone] = useState('');
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addressType, setAddressType] = useState("");

  
  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: true,
   addressType: "",
   landmark: "",
  });



            const getAddresses = async () => {
              try {
                const res = await fetchDataFromApi("/api/address");
                if (res?.success) {
                  setAddresses(res.data);
            

                  const defaultAddr = res.data.find(addr => addr.status === true);
if (defaultAddr) {
  setSelectedAddressId(defaultAddr._id);
} else if (res.data.length > 0) {
  setSelectedAddressId(res.data[0]._id);
}

            
                } else {
                  setAddresses([]);
                  setSelectedAddressId(null);
                }
              } catch (error) {
                console.log(error);
                setAddresses([]);
                setSelectedAddressId(null);
              }
            };

                  useEffect(() => {
  if (context?.userData?._id) {
    getAddresses();
  }
}, [context?.userData]);

useEffect(() => {
  getAddresses();
}, [context.refreshAddress]);


    

  const handleClose = () => {
    setIsOpenModel(false);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const removeAddress = (id) => {
  if (!id) {
    console.error("Address ID missing");
    return;
  }

  deleteData(`/api/address/${id}`).then((res) => {
    if (res?.success) {
      context.openAlertBox("success", "Address Deleted Successfully!");
      context.setRefreshAddress(prev => !prev);
    } else {
      context.openAlertBox("error", res?.message || "Something went wrong!");
    }
  });
};

const handleChangeAddressType = (event) => {
    setAddressType(event.target.value);
    setFormFields(prev => ({ ...prev, addressType: event.target.value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
      if (!formFields.address_line1.trim()) {
        return context.openAlertBox("error", "Please enter address line");
      }
      if (!formFields.city.trim()) {
        return context.openAlertBox("error", "Please enter city");
      }
      if (!formFields.state.trim()) {
        return context.openAlertBox("error", "Please enter state");
      }
      if (!formFields.pincode.trim()) {
        return context.openAlertBox("error", "Please enter pincode");
      }
      if (!formFields.country.trim()) {
        return context.openAlertBox("error", "Please enter country");
      }
      // handleSubmit ke andar
  if (!phone || String(phone).trim().length < 10) {
    return context.openAlertBox("error", "Please enter a valid mobile number");
  }

  if (!addressType) {
    return context.openAlertBox("error", "Please select an address type");
  }

  if (!formFields.landmark.trim()) {
    return context.openAlertBox("error", "Please enter a landmark");
  }
  
  
       try {
      setIsLoading(true);
  
      const finalData = {
        ...formFields,
        mobile: phone,
        addressType: addressType, 
        status: status,
      };
  
      const token = localStorage.getItem("accesstoken");
  
  const response = await postData(
    "/api/address/add",
    finalData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }
  );
  
  
      console.log("Add Address Response:", response); // ✅ debug
  
      setIsLoading(false);
  
      if (response && response.success) {
        context.openAlertBox("success", "Address Saved Successfully!");
        setIsOpenModel(false);
        context.setRefreshAddress(prev => !prev);
        context.setIsOpenFullScreenPanel({ open:false });
  
        // form reset
        setFormFields({
          address_line1: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile: "",
          status: true,
        });
        setPhone("");
        setStatus(true);
  
      } else {
        context.openAlertBox("error", response.message || "Something went wrong!");
      }
  
    } catch (err) {
      setIsLoading(false);
      
    }
  };

  return (
    <>
      <section className="!py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <AccountSlidebar />
          </div>

          <div className="col2 w-[50%]">
            <div className="card bg-white !p-5 shadow-md rounded-md !mb-5">
              <div className="flex items-center !pb-3">
                <h2 className="!pb-0">Address</h2>
              </div>
              <hr />

              <div
                className="
    flex items-center justify-center 
    !p-5 !mt-3
    border border-dashed border-gray-300 
    bg-[#f9f9f9] 
    rounded-md 
    cursor-pointer 
    hover:bg-gray-200 
    transition-all
  "
                onClick={() =>
                  setIsOpenModel(true)
                }
              >
                <span className="text-[14px] text-gray-600">+ Add Address</span>
              </div>

              <div className="!mt-4 space-y-4">
  {addresses.map((addr) => (
    <div
      key={addr._id}
      onClick={() => setSelectedAddressId(addr._id)}
      className={`border !p-2 rounded-md cursor-pointer !my-3
      ${
        selectedAddressId === addr._id
          ? "border-blue-500 bg-blue-50"
          : "bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-start gap-3 group">
        
        {/* Left Side */}
        <div className="flex gap-3">
          <input
            type="radio"
            checked={selectedAddressId === addr._id}
            onChange={() => setSelectedAddressId(addr._id)}
            className="mt-1"
          />

<div className="w-full">

  {/* Address Type */}
  <div className="mb-2">
    <span className="inline-block bg-[#2563eb] text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
      {addr.addressType}
    </span>
  </div>

  {/* Name + Mobile */}
  <div className="flex gap-4 items-center">
    <h4 className="text-[16px] font-semibold text-gray-800">
      {addr.userId?.name}
    </h4>

    <span className="text-[14px] font-medium text-gray-700">
      📞 {addr.mobile}
    </span>
  </div>

  {/* Email */}
  <p className="text-[13px] text-gray-500 mt-1">
    {addr.userId?.email}
  </p>

  {/* Address */}
  <div className="mt-3 text-[14px] text-gray-700 leading-6">
    <p>
      <span className="font-medium">Address :</span>{" "}
      {addr.address_line1}
      {addr.landmark && `, ${addr.landmark}`},
      {" "}
      {addr.city}, {addr.state} - {addr.pincode},
      {" "}
      {addr.country}
    </p>
  </div>

</div>
        </div>

        {/* Right Side Trash */}
        <button
  className="hidden group-hover:flex items-center justify-center bg-gray-500 h-[30px] w-[30px] text-white mt-1 rounded-full"
  onClick={(e) => {
    e.stopPropagation(); // ✅ MOST IMPORTANT
    removeAddress(addr._id);
  }}
>
  <FaRegTrashAlt size={18} />
</button>


      </div>
    </div>
  ))}
</div>

            </div>
          </div>
        </div>
      </section>

      <Dialog  open={isOpenModel}>
        <DialogTitle>Add Address</DialogTitle>

        <form className="!p-8 !py-3 !pb-8" onSubmit={handleSubmit} >
          <div className="flex items-center gap-5 !pt-2 !pb-5">
            <div className="col w-full">
              <TextField
                className="w-full"
                label="Address Line 1"
                variant="outlined"
                size="small"
                name="address_line1"
              value={formFields.address_line1}
              onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 !pt-2 !pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="City"
                variant="outlined"
                size="small"
                name="city"
              value={formFields.city}
              onChange={onChangeInput}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="State"
                variant="outlined"
                size="small"
                name="state"
              value={formFields.state}
              onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 !pt-2 !pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Pincode"
                variant="outlined"
                size="small"
                name="pincode"
              value={formFields.pincode}
              onChange={onChangeInput}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Country"
                variant="outlined"
                size="small"
                name="country"
              value={formFields.country}
              onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 !pt-2 !pb-5">
            <div className="col w-[50%]">
              <PhoneInput
                defaultCountry="in"
                value={phone || ""}
                className="w-full"
                onChange={(phone) => {
                  const ph = String(phone || "");
                  setPhone(ph);
                  setFormFields((prev) => ({
                    ...prev,
                    mobile: ph,
                  }));
                }}
              />
            </div>

            <div className="col w-[50%]">
  <TextField
    className="w-full"
    label="Landmark"
    variant="outlined"
    size="small"
    name="landmark"
    value={formFields.landmark}
    onChange={onChangeInput}
  />
</div>

            
          </div>
          <div className="flex items-center gap-5 !pt-2 !pb-5">

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Address Type</FormLabel>
            
          
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" className="flex items-center gap-5"
              onChange={handleChangeAddressType} value={addressType}>
                
                <FormControlLabel value="Home" control={<Radio />} label="Home" />
                <FormControlLabel value="Work" control={<Radio />} label="Work" />
              </RadioGroup>
              </FormControl>
            </div>

          

        <div className="flex justify-end gap-3">
          <Button className='btn-border btn-lg w-full flex gap-2 items-center' onClick={handleClose}>Cancel</Button>
          <Button type="submit" className='btn-org btn-lg w-full flex gap-2 items-center'>Save</Button>
        </div>
        </form>

      


      </Dialog>
    </>
  );
};

export default Address;
