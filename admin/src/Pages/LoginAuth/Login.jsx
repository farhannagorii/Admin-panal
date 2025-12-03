import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../Config";
import { loginContext } from "../Maincontext";

export default function Login() {
  const navigate = useNavigate();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (event) => {
  //   event.preventDefault()
  //   let userName=event.target.userName.value
  //   let userPassword=event.target.userPassword.value
    
  //   let obj={
  //     userName,
  //     userPassword
  //   }
  //   axios.post(`${apiBaseUrl}/auth/login`,obj)
  //   .then((res)=>res.data)
  //   .then((final)=>{
  //     console.log(final)
  //   })
  //   console.log(obj)

  //   navigate("/dashboard");
  // };
let {user,setuser}= useContext(loginContext)
  let onSubmit=(e)=>{
      e.preventDefault()
      let userName=e.target.userName.value;
      let password=e.target.userPassword.value;
      let obj={
        userName,
        password
      }
      console.log(obj)
      axios.post(`${apiBaseUrl}/auth/login`,obj)
      .then((res)=>res.data)
      .then((finalres)=>{
        console.log(finalres)
        if(finalres.status==1){
          setuser(finalres.user)
          navigate("/dashboard")
        }
        else{
          alert("invalid user")
        }
      })
  }
   
   useEffect(()=>{
       if(user){
        navigate("/dashboard")
       }
   },[user])
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className=""
            src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg"
            alt="logo"
          />
          
        </a>
        <form autoComplete="off"
          onSubmit={onSubmit}
          className="w-[500px] bg-white rounded-lg shadow-2xl p-6 space-y-4"
        >
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <div>
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              userName
            </label>
            <input
              type="userName"
              id="userName"
              name="userName"
              // {...register("userName", { required: "userName is required" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Enter userName"
            />
            {/* {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
            )} */}
          </div>
          <div>
            <label
              htmlFor="userPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="userPassword"
              id="userPassword"
              name="userPassword"
              // {...register("userPassword", { required: "userPassword is required" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Enter userPassword"
            />
            {/* {errors.userPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.userPassword.message}</p>
            )} */}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
