import React, { useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import {logout} from '../../services/operations/authAPI'
import {Link, useNavigate} from 'react-router-dom'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

const ProfileDropDown = () => {
  const {user} =  useSelector((state)=>state.profile)
  const [Open,setOpen] = useState(false);
  const dispatch = useDispatch(); 
  const navigate = useNavigate()
  const myref = useRef();
  useOnClickOutside(myref,()=>{setOpen(false)});
  if (!user) return null;
  return (
    <button onClick={()=>{setOpen(true)}}>
      <div className=' flex items-center gap-x-1 relative '>
      <img src={user?.image} alt={`profile-${user?.firstName}`} className='w-[34px] rounded-full object-cover'/>
      <AiOutlineCaretDown className='text-sm text-richblack-100'/>
      </div>
      {
        Open && (
          <div className='flex flex-col text-richblack-100 absolute right-8 lg:-right-[30px] top-10  divide-y-[1px] 
          divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'
          ref={myref}
          onClick={(e)=>e.stopPropagation()}
          >
             <Link to='/dashboard/my-profile' onClick={() => setOpen(false)}>
             <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
             <VscDashboard className='text-lg text-richblack-5'/>
             <p>Dashboard</p>
             </div>
             </Link>
             <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
             <VscSignOut className='text-lg text-richblack-5'/>
             <p 
             onClick={()=>{dispatch(logout(navigate))
             setOpen(false)
             }}
             >Logout</p>
             </div>
          </div>
        )
      }
    </button>
  )
}

export default ProfileDropDown
