import React ,{useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword} from '../services/operations/authAPI'
import { BiArrowBack } from "react-icons/bi";
const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector((state)=>state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData,setFormData] = useState({
        password: "",
        confirmPassword: "",
      });
      const {password,confirmPassword} = formData;
    const handleOnChange = (e)=>{
        e.preventDefault();
        setFormData((PrevData)=>({
            ...PrevData,
            [e.target.name]:e.target.value
        }));
    }  
    const handleOnSubmit = ()=>{
        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        const token = location.pathname.split('/').at(-1);

        dispatch(resetPassword(password,confirmPassword,token,navigate));

    }  
  return (
    <div>
    {
        loading?(
            <div>
            <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin' role='status'></div>
            <span className='ml-4'>Loading...</span>
            </div>
        ):(
            <div className='flex flex-col gap-y-1 lg:ml-[600px] lg:pt-[200px]'>
                <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Choose  new password</h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100 lg:w-[444px]">Almost done. Enter your new password and youre all set.</p>
                <form className='flex flex-col gap-y-3' onSubmit={handleOnSubmit}>
                <label className='flex flex-col gap-2 relative'>
                <p  className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>New password<sup className="text-pink-200">*</sup></p>
                <input
                required
                type= {showPassword ? "text" : "password"}
                name='password'
                placeholder='Enter Password'
                value={password}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[444px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
                <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute z-[10] cursor-pointer left-[394px] top-[45px]"
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
                placeholder='Enter Password'
                value={confirmPassword}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[444px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
                <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute z-[10] cursor-pointer left-[394px] top-[45px]"
                >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              </label>  
              <button type='submit' className='lg:w-[444px] bg-yellow-100 rounded-xl py-3 mt-1'>
              Reset Password
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

export default UpdatePassword
