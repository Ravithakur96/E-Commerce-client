import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { CircularProgress } from "@mui/material";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import { firebaseApp } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();


  useEffect(() => {
      window.scrollTo(0, 0);
  
    }, []);
 
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const validValue = Object.values(formFields).every((el) => el.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formFields.name.trim()) {
      return context.openAlertBox("error", "Please add full name");
    }
    if (!formFields.email.trim()) {
      return context.openAlertBox("error", "Please enter your email id");
    }
    if (!formFields.password.trim()) {
      return context.openAlertBox("error", "Please enter your password");
    }

    setIsLoading(true);
    const response = await postData("/api/user/register", formFields);
    setIsLoading(false);

    if (response?.error !== true) {
      context.openAlertBox("success", response?.message || "Registered successfully!");
      localStorage.setItem("userEmail", formFields.email);
      
      setFormFields({
        name: "",
        email: "",
        password: "",
      });
      navigate("/verify");
    } else {
      context.openAlertBox("error", response?.message || "Registration failed!");
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
      navigate("/");
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
    <section className="section !py-10">
      <div className="container">
        <div className="card shadow-ms w-[400px] !m-auto rounded-md bg-white !p-5 !px-10">
          <h3 className="text-center text-[18px] text-black">
            Register with a new account
          </h3>

          <form className="w-full !mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full !mb-5">
              <TextField
                id="name"
                type="text"
                name="name"
                value={formFields.name}
                disabled={isLoading == true ? true : false}
                label="Full Name *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full !mb-5">
              <TextField
                id="email"
                type="email"
                name="email"
                value={formFields.email}
                disabled={isLoading == true ? true : false}
                label="Email Id *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full !mb-5 relative">
              <TextField
                id="password"
                type={isShowPassword ? "text" : "password"}
                label="Password *"
                name="password"
                value={formFields.password}
                disabled={isLoading == true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
              <Button
                type="button"
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <div className="flex items-center w-full !mt-3 !mb-3">
              <Button
                type="submit"
                disabled={!validValue || isLoading}
                className="btn-org btn-lg w-full flex gap-3 justify-center"
              >
                {isLoading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>

            <p className="text-center">
              Already have an account?{" "}
              <Link
                className="link text-[14px] font-[600] text-[#ff5252]"
                to="/login"
              >
                Login
              </Link>
            </p>

            <p className="text-center font-[500] mt-3 mb-2">
              Or continue with social account
            </p>

            <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black" onClick={authWithGoogle}>
              <FcGoogle className="text-[20px]" /> Sign In with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
