import React from 'react'
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import EventInformationForm from "./EventInformationForm"
import PublishEvent from "./PublishEvent"

const RenderSteps = () => {
    const { step } = useSelector((state) => state.event)
    const steps = [
        {
          id: 1,
          title: "Event Information",
        },
        {
          id: 2,
          title: "Publish",
        },
      ]
  return (
    <div className=' flex flex-col items-center'>
       <div className=' mb-2 flex lg:w-[645px] w-[400px] transform translate-x-[-140px] lg:translate-x-[140px] '>
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

       <div className=" transform translate-x-[-240px] lg:translate-x-[-70px] gap-16 lg:  mb-12 flex lg:w-[340px] select-none justify-between ">
        {steps.map((item) => (
          <>      
              <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>
                {item.title}
              </p>
          </>
        ))}
      </div>

        {step === 1 && <EventInformationForm />}
        {step === 2 &&  <PublishEvent /> }       
    </div>
  )
}

export default RenderSteps
