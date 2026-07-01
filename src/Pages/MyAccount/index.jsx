import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AccountSlidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData, postData } from '../../utils/api';
import { CircularProgress } from '@mui/material';
import  {Collapse} from "react-collapse";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const MyAccount = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setUserId] = useState("");
    const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);
    const [phone, setPhone] = useState("");

    const [formFields, setFormFields] = useState({ 
        name:"",
        email: "",
        mobile: "" });

        const [changePassword, setChangePassword] = useState({ 
          email: "",
        oldPassword:"",
        newPassword: "",
        confirmPassword: "" });


    const context = useContext(MyContext);
    const navigate  = useNavigate();

    useEffect(()=>{

    const token = localStorage.getItem("accesstoken")
    if(token===null){
        navigate ('/');
    }

    },[])

    useEffect(()=>{
  if(context?.userData?._id){
    setUserId(context.userData._id);

    setFormFields({
      name: context.userData.name,
      email: context.userData.email,
      mobile: context.userData.mobile
    });


    setPhone(String(context.userData.mobile || ""));

    setChangePassword({
      email: context.userData.email
    });
  }
}, [context?.userData]);


    const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    setChangePassword({ ...changePassword, [name]: value });

  };

  const validValue = Object.values(formFields).every(
  (el) => String(el).trim() !== ""
);


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (isLoading) return;

  if (!formFields.name.trim()) {
    return context?.openAlertBox("error", "Please enter your full name");
  }
  if (!formFields.email.trim()) {
    return context?.openAlertBox("error", "Please enter your email id");
  }
  if (!String(formFields.mobile).trim()) {
    return context?.openAlertBox("error", "Please enter your mobile number");
  }

  try {
    setIsLoading(true);

    const response = await editData(
      `/api/user/${userId}`,
      formFields,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
        },
        withCredentials: true
      }
    );

    setIsLoading(false);

    if (response && !response.error) {
      context?.openAlertBox("success", response?.message || "Profile updated!");

      setFormFields({
        name: response?.data?.user?.name || formFields.name,
        email: response?.data?.user?.email || formFields.email,
        mobile: response?.data?.user?.mobile || formFields.mobile
      });


      context.setUserData({
        name: response?.data?.user?.name,
        email: response?.data?.user?.email,
        mobile: response?.data?.user?.mobile
      });

    } else {
      context?.openAlertBox("error", response?.message || "Enter Valid details!");
    }

  } catch (err) {
    console.error("Error:", err);
    setIsLoading(false);
    context?.openAlertBox("error", "Something went wrong!");
  }
};

const validValue2 = Object.values(formFields).every(
  (el) => String(el).trim() !== ""
);

const handleSubmitChangePassword = async (e) => {
  e.preventDefault();
  if (isLoading2) return;

  const isGoogleUser = context?.userData?.signUpWithGoogle;

  if (!isGoogleUser && !changePassword.oldPassword.trim()) {
    return context?.openAlertBox("error", "Please enter your old password");
  }

  if (!changePassword.newPassword.trim()) {
    return context?.openAlertBox("error", "Please enter your new password");
  }

  if (!changePassword.confirmPassword.trim()) {
    return context?.openAlertBox("error", "Please enter your confirm password");
  }

  if (changePassword.confirmPassword !== changePassword.newPassword) {
    return context?.openAlertBox("error", "Password and confirm password not match");
  }

  try {
    setIsLoading2(true);

    const response = await postData(
      `/api/user/reset-password`,
      {
        ...changePassword,
        oldPassword: isGoogleUser ? null : changePassword.oldPassword
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
        },
        withCredentials: true
      }
    );

    setIsLoading2(false);

    if (response && !response.error) {
      context?.openAlertBox("success", response?.message || "Password updated!");
    } else {
      context?.openAlertBox("error", response?.message || "Something went wrong");
    }

  } catch (err) {
    setIsLoading2(false);
    context?.openAlertBox("error", "Server error");
  }
};



  return (
    <section className='!py-10 w-full'>
        <div className="container flex gap-5">
        <div className="col1 w-[20%]">
            <AccountSlidebar/>
        </div>

        <div className="col2 w-[50%]">
            <div className="card bg-white !p-5 shadow-md rounded-md !mb-5">
                <div className="flex items-center !pb-3">
                  <h2 className='!pb-0'>My Profile</h2>
                  <Button className='!ml-auto' onClick={() => setIsChangePasswordFormShow(!isChangePasswordFormShow)}>
  Change Password
</Button>
 
                </div>
                <hr/>


                <form className='!mt-8' onSubmit={handleSubmit}>
                <div className="flex items-center gap-5">
                <div className="w-[50%]">
                <TextField  label="Full Name" variant="outlined" size='small' className='w-full'  name="name"
                  value={formFields.name}
                  disabled={isLoading}  onChange={onChangeInput}/>
                </div>

                <div className="w-[50%]">
                <TextField type='email'  label="Email" variant="outlined" size='small' className='w-full'  name="email"
                  value={formFields.email}
                  disabled={true}  onChange={onChangeInput}/>
                </div>
               
                </div>

                <div className="flex items-center gap-5 !mt-4">
                <div className="w-full">
              <PhoneInput
  defaultCountry="in"
  value={phone}
  disabled={isLoading}
  className="w-full"
  onChange={(phone) => {
    const ph = String(phone || "");
    setPhone(ph);

    setFormFields(prev => ({
      ...prev,
      mobile: ph
    }));
  }}
/>


                </div>
                </div>


                <br/>
                <div className="flex items-center gap-4">
                    <Button type='submit' disabled={!validValue || isLoading} className='btn-org btn-lg w-[250px] '>

                        {isLoading ? (
                                            <CircularProgress size={22} color="inherit" />
                                          ) : (
                                            "Update Profile"
                                          )}
                    </Button>
                    
                </div>
                </form>
            </div>


             <Collapse isOpened ={isChangePasswordFormShow}>
            <div className="card bg-white !p-5 shadow-md rounded-md">
                <div className="flex items-center !pb-3">
                  <h2 className='!pb-0'>Change Password</h2>
                  
                </div>
                <hr/>


                <form className='!mt-8' onSubmit={handleSubmitChangePassword}>
                <div className="grid grid-cols-2 gap-5">
                  {!context?.userData?.signUpWithGoogle && (
  <div className="col">
    <TextField
      label="Old Password"
      variant="outlined"
      size="small"
      className="w-full"
      name="oldPassword"
      value={changePassword.oldPassword || ""}
      disabled={isLoading2}
      onChange={onChangeInput}
    />
  </div>
)}

                

                <div className="col">
                <TextField type='text'  label="New Password" variant="outlined" size='small' className='w-full'  name="newPassword"
                  value={changePassword.newPassword}
                    onChange={onChangeInput}/>
                </div>

                <div className="col">
                <TextField  label="Confirm Password" variant="outlined" size='small' className='w-full'  name="confirmPassword"
                  value={changePassword.confirmPassword}
                   onChange={onChangeInput}/>
                </div>
               
                </div>




                <br/>
                <div className="flex items-center gap-4">
                    <Button type='submit' className='btn-org btn-lg w-[250px] '>

                        {isLoading2 ? (
                                            <CircularProgress size={22} color="inherit" />
                                          ) : (
                                            "Change Password"
                                          )}
                    </Button>
                    
                </div>
                </form>
                </div></Collapse>



            
        </div>
        </div>
      
    </section>
  );
}

export default MyAccount;
