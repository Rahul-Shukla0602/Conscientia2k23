import React,{useState}from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-hot-toast"
import Tab from '../common/Tab'
import {ACCOUNT_TYPE} from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setSignupData} from '../../slices/authSlice'
import {sendotp} from '../../services/operations/authAPI'
const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType,setAccountType] = useState(ACCOUNT_TYPE.PARTICIPANT);///accountType
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData,setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const {firstName,lastName,email,password,confirmPassword} = formData;

  const handleOnChange = (e)=>{
    e.preventDefault();
    setFormData((PrevData)=>({
      ...PrevData,
      [e.target.name]:e.target.value
    }));
  }


  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "PARTICIPANT",
      type: ACCOUNT_TYPE.PARTICIPANT,
    },
    // {
    //   id: 2,
    //   tabName: "ORGANIZER",
    //   type: ACCOUNT_TYPE.ORGANIZER,
    // },
  ]
  const handleOnSubmit = ()=>{
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    console.log("FormData: ",FormData)
    const signupData = {
      ...formData,
      accountType,
    }
    console.log("signup-data:",signupData)
    dispatch(setSignupData(signupData));
    dispatch(sendotp(formData.email,navigate));
  }

  return (
    <div className=''>
     <Tab tabData={tabData} field={accountType} setField={setAccountType} />

    <form  onSubmit={handleOnSubmit} className=' flex flex-col gap-y-4'>
        <div className='flex flex-col lg:flex-row gap-x-5'>
          {/* first and last name */}
            <label className='flex flex-col gap-2'>
               <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>First Name<sup className="text-pink-200">*</sup></p>
               <input
                required
                type='text'
                name='firstName'
                onChange={handleOnChange}
                placeholder='Enter first name'
                value={firstName}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className=" w-[300px] lg:w-[212px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
               />
            </label>
            <label className='flex flex-col gap-2'>
               <p  className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>last Name<sup className="text-pink-200">*</sup></p>
               <input
                required
                type='text'
                name='lastName'
                onChange={handleOnChange}
                placeholder='Enter last name'
                value={lastName}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[300px] lg:w-[212px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
               />
            </label>
          {/* first and last name */}
          </div>
  
            {/* email */}
            <label className='flex flex-col gap-2'>
              <p  className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address<sup className="text-pink-200">*</sup></p>
              <input
                required
                type='email'
                name='email'
                onChange={handleOnChange}
                placeholder='Enter email address'
                value={email}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[300px] lg:w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>
            {/* phone number component baad mai daal dunga */}
            {/* <PhoneNumberInput/> */}
            
            <div className='flex flex-col lg:flex-row gap-x-5'>
            {/* password */}
              <label className='flex flex-col gap-2 relative'>
                <p  className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Create Password<sup className="text-pink-200">*</sup></p>
                <input
                required
                type= {showPassword ? "text" : "password"}
                name='password'
                onChange={handleOnChange}
                placeholder='Enter Password'
                value={password}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[300px] lg:w-[212px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
                <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute z-[10] cursor-pointer left-[250px] lg:left-[174px] top-[45px]"
                >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              </label>

              <label className='flex flex-col gap-2 relative'>
                <p  className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm Password<sup className="text-pink-200">*</sup></p>
                <input
                required
                type= {showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                onChange={handleOnChange}
                placeholder='Enter Password'
                value={confirmPassword}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[300px] lg:w-[212px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
                <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute z-[10] cursor-pointer left-[250px] lg:left-[174px] top-[45px]"
                >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              </label>              
            </div>

            <button
            type='submit'
            className='w-[300px] lg:w-full bg-yellow-100 rounded-xl py-3 mt-2'
            >
              Create Account
            </button>

    </form>
      
    </div>
  )
}

export default SignupForm
