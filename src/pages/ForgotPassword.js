import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import {getPasswordResetToken} from '../services/operations/authAPI'
const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const [emailSent ,setEmailSent] = useState(false);
    const {loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
  return (
    <div>
    {
        loading?(
            <div className='spinner'>Loading...</div>
        ):(
            <div className='flex flex-col gap-y-1 lg:ml-[600px] lg:pt-[200px]'>
                <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                    {
                        !emailSent?'Reset your password':'Check email'
                    }
                </h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100 lg:w-[444px]">
                    {
                        !emailSent?`Have no fear. We’ll email you instructions to reset yourpassword.
                        If you dont have access to your email we can try account recovery`:
                        `We have sent the reset email to ${email}`
                    }
                </p>
                <form className='flex flex-col gap-y-3' onSubmit={handleOnSubmit}>
                    {
                        !emailSent&&
                         <label>
                            <p>Email Address:</p>
                            <input 
                                required
                                type='email'
                                name='email'
                                onChange={(e)=>{setEmail(e.target.value)}}
                                placeholder='Enter email address'
                                value={email}
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className='lg:w-[444px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                            />
                         </label>
                    }
                    <button className='lg:w-[444px] bg-yellow-100 rounded-xl py-3 mt-1'>
                    {
                        !emailSent? 'Reset Password' : 'Resend Email'
                    }
                </button>
                </form>
                <div>
                        <Link to='/login'>
                        <p className="text-richblack-5 flex items-center gap-x-2">
                        <BiArrowBack/>
                        Back to login
                        </p>
                        </Link>
                </div>
            </div>
        )
    }
    </div>
  )
}

export default ForgotPassword
