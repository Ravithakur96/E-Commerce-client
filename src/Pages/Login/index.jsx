import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../App';
import { CircularProgress } from "@mui/material";
import { postData } from '../../utils/api';
import { firebaseApp } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const context = useContext(MyContext);
  const history = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({ email: "", password: "" });
 


  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);


  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const validValue = Object.values(formFields).every((el) => el.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formFields.email.trim()) {
      return context?.openAlertBox("error", "Please enter your email id");
    }
    if (!formFields.password.trim()) {
      return context?.openAlertBox("error", "Please enter your password");
    }

    try {
      setIsLoading(true);
      const response = await postData("/api/user/login", formFields, { withCredentials: true });
      console.log("Login Response:", response);
      setIsLoading(false);

      if (response && !response.error) {
        context?.openAlertBox("success", response?.message || "Logged in successfully!");
        setFormFields({ email: "", password: "" });

        localStorage.setItem('accesstoken', response?.data?.accesstoken);
        localStorage.setItem('refreshtoken', response?.data?.refreshtoken);

        const userEmail = response?.data?.user?.email || formFields.email;
        const userName = response?.data?.user?.name || "User";

        context.setUserData({ name: userName, email: userEmail });
        localStorage.setItem("userEmail", userEmail);

        context.setIsLogin(true);
        history("/");
      } else {
        context?.openAlertBox("error", response?.message || "Enter Valid details!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setIsLoading(false);
      context?.openAlertBox("error", "Something went wrong!");
    }
  };

  const ForgotPassword = () => {
    if(formFields.email===""){
      context.openAlertBox("error","Please enter email id");
      return false;
    }

    else{
      context.openAlertBox("success",`OTP send to ${formFields.email}`);
      localStorage.setItem("userEmail",formFields.email);
      localStorage.setItem("actionType",'forgot-password');


      postData("/api/user/forgot-password",{
            email:formFields.email,
            }).then((res)=>{
            if(res?.error===false){
            context.openAlertBox("succcess", res?.message);
            history('/verify')
            }else{
            context.openAlertBox("error", res?.message);
            }
        })

    }
  };


    const authWithGoogle = async () => {
    try {
      setIsLoading(true);
  
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const fields = {
        name: user.displayName,
        email: user.email,
        password: "null",
        images: user.photoURL,
        phone: user.phoneNumber,
        role: "USER",
      };
  
      const response = await postData("/api/user/authWithGoogle", fields);
      setIsLoading(false);
  
      if (response?.error !== true) {
        context.openAlertBox(
          "success",
          response?.message || "Logged in successfully!"
        );
        localStorage.setItem("userEmail", fields.email);
        localStorage.setItem('accesstoken', response?.data?.accesstoken);
        localStorage.setItem('refreshtoken', response?.data?.refreshtoken);
        
        context.setIsLogin(true);
        history("/");
      } else {
        context.openAlertBox(
          "error",
          response?.message || "Google login failed!"
        );
      }
    } catch (error) {
      setIsLoading(false);
      context.openAlertBox("error", error.message);
    }
  };

  return (
    <div>
      <section className='section !py-10'>
        <div className="container">
          <div className="card shadow-md w-[400px] !m-auto rounded-md bg-white !p-5 !px-10">
            <h3 className='text-center text-[18px] text-black'>Login to your account</h3>

            <form className='w-full !mt-5' onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="form-group w-full !mb-5">
                <TextField
                  id="email"
                  type="email"
                  label="Email Id *"
                  name="email"
                  value={formFields.email}
                  disabled={isLoading}
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                />
              </div>

              {/* Password Field */}
              <div className="form-group w-full !mb-5 relative">
                <TextField
                  id="password"
                  type={isShowPassword ? 'text' : 'password'}
                  label="Password *"
                  variant="outlined"
                  className="w-full"
                  name="password"
                  value={formFields.password}
                  disabled={isLoading}
                  onChange={onChangeInput}
                />
                <Button
                  type="button"
                  className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black'
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <IoMdEyeOff className='text-[20px] opacity-75' />
                  ) : (
                    <IoMdEye className='text-[20px] opacity-75' />
                  )}
                </Button>
              </div>

              {/* forgot Password */}
              <a className='link cursor-pointer text-[14px] font-[600]' onClick={ForgotPassword}>
                forgot Password
              </a>

              {/* Login Button */}
              <div className="flex items-center w-full !mt-3 !mb-3">
                <Button
                  type="submit"
                  disabled={!validValue || isLoading}
                  className="btn-org btn-lg w-full flex gap-3 justify-center"
                >
                  {isLoading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>

              {/* Register Link */}
              <p className='text-center'>
                Not Registered?{" "}
                <Link className='link text-[14px] font-[600] text-[#ff5252]' to="/register">
                  Sign Up
                </Link>
              </p>

              {/* Social Login */}
              <p className='text-center font-[500]'>Or continue with social account</p>
              <Button className='flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black'onClick={authWithGoogle}>
                <FcGoogle className='text-[20px]' /> Login with Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
