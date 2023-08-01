import React, { useEffect } from 'react'
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import RegistrationForm from './index'
import Register from './Register'

const RenderRegister = () => {
    const { step } = useSelector((state) => state.event)
    const steps = [
        {
          id: 1,
          title: "Register",
        },
        {
          id: 2,
          title: "Payment",
        },
      ]
      useEffect(()=>{
        console.log("step: ",step)
      })
  return (
    <div className='flex flex-col items-center absolute top-[100px] lg:left-[31%] '>
       <div className='mb-2 hidden lg:flex lg:w-[645px] lg:relative absolute sm:left-[10px] transform  lg:translate-x-[170px] '>
       {steps.map((item) => (
          <>
            <div className="flex flex-col items-center ">
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}>
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
       </div>

       <div className=" transform translate-x-[-240px] lg:translate-x-[-10px] lg:mb-12 flex lg:w-[340px] select-none justify-between ">
        {steps.map((item) => (
          <>      
              <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>
                {item.title}
              </p>
          </>
        ))}
      </div>

        {step === 1 && <RegistrationForm/>}
        {step === 2 &&  <Register/> }       
    </div>
  )
}

export default RenderRegister
