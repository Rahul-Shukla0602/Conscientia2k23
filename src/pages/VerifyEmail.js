import React, { useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import { signUp,sendotp} from '../services/operations/authAPI'
import OTPInput from 'react-otp-input'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,signupData} = useSelector((state)=>state.auth)
    const [otp,setOtp] = useState('');
    const handleVerifyAndSignup = (e)=>{
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          } = signupData;
          dispatch(signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
          ))
    }
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center max-auto">
        {
            loading?(
                <div className='spinner'></div>
            ):(
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                    Verify email</h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                    A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleVerifyAndSignup}>
                        <OTPInput
                            value={otp}
                            numInputs={6}
                            onChange={setOtp}
                            renderInput={(props)=>(
                                <input
                                    {...props}
                                    placeholder='-'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}      
                        />
                        <button
                        type='submit'
                        className='w-full bg-yellow-100 rounded-xl py-3 mt-2 font-medium text-richblack-90'
                        >Verify and Register</button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to='/signup'>
                        <p className="text-richblack-5 flex items-center gap-x-2">
                        <BiArrowBack/>
                        Back to signup
                        </p>
                        </Link>
                        <button onClick={()=>{dispatch(sendotp(signupData.email,navigate))}} 
                        className="flex items-center text-blue-100 gap-x-2">
                        <RxCountdownTimer/>
                        Resend it
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail
