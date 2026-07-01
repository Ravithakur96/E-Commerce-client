import React, { useContext, useEffect, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { MyContext } from '../../App';
import { CircularProgress } from '@mui/material';
import { uploadImage } from '../../utils/api';
import { LuMapPin } from "react-icons/lu";

const AccountSlidebar = () => {
  const [uploading, setUploading] = useState(false);
  const context = useContext(MyContext);

  // File upload handler
  const onChangeFile = async (e, apiEndPointer) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      context?.openAlertBox("error", "Please select a valid JPG, PNG, or WEBP image file.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await uploadImage(apiEndPointer, formData);
      setUploading(false);

      if (res?.data?.avatar) {
        context.setUserData(prev => ({ ...prev, avatar: res.data.avatar }));
        context.openAlertBox("success", "Avatar updated successfully!");
      } else {
        context.openAlertBox("error", "Image upload failed!");
      }
    } catch (err) {
      console.error(err);
      setUploading(false);
      context.openAlertBox("error", "Something went wrong while uploading!");
    }
  };

  // Get first letter of name for default avatar
  const getInitial = (name) => {
    if (!name) return "U"; // Unknown
    return name.charAt(0).toUpperCase();
  };

  const { name, email, avatar, phone } = context.userData || {};

  return (
    <div className="card bg-white shadow-md !rounded-md sticky top-[10px]">
      <div className="w-full !p-5 flex items-center justify-center flex-col ">
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden !mb-4 relative group flex items-center justify-center bg-gray-200">

          {uploading ? (
            <CircularProgress color="inherit" />
          ) : avatar ? (
            <img
              src={avatar}
              className="w-full h-full object-cover"
              alt="avatar"
            />
          ) : (
            // Default initial avatar
            <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white text-[40px] font-bold">
              {getInitial(name)}
            </div>
          )}

          <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
              accept="image/*"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
            />
          </div>
        </div>

        <h3 className="!pt-5">{name}</h3>
        <h6 className="text-[14px] font-[500]">{email}</h6>
        {phone && <h6 className="text-[14px] font-[500]">{phone}</h6>}
      </div>

      <ul className="list-none !pb-5 bg-[#f1f1f1] myAccountTabs">
        <li className="w-full">
          <NavLink to="/my-account" exact="true" activeClassName="isActive">
            <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] rounded-none flex items-center gap-2">
              <FaRegUser className="text-[15px]" /> My Profile
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink to="/address" exact="true" activeClassName="isActive">
            <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] rounded-none flex items-center gap-2">
              <LuMapPin className="text-[18px]" /> Add Address
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink to="/my-list" exact="true" activeClassName="isActive">
            <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] rounded-none flex items-center gap-2">
              <IoBagCheckOutline className="text-[17px]" /> My List
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink to="/my-orders" exact="true" activeClassName="isActive">
            <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] rounded-none flex items-center gap-2">
              <FaRegHeart className="text-[17px]" /> My Orders
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] rounded-none flex items-center gap-2">
            <IoIosLogOut className="text-[18px]" /> Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSlidebar;
