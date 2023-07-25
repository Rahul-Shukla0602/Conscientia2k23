import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Slider from '../components/DashBoard/Slider'
import { Outlet } from 'react-router-dom';
import {AiOutlineDoubleRight} from 'react-icons/ai'
import {AiOutlineDoubleLeft} from 'react-icons/ai'
const DashBoard = () => {
    const {loading:authLoading } = useSelector((state)=>state.auth);
    const {loading:profileLoading } = useSelector((state)=>state.profile);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    if(profileLoading || authLoading ){
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200
                animate-spin' role='status'>
                </div>
                <span className='ml-4'>Loading...</span>
            </div>
        );
    }
  return (
    <div className='flex h-screen pt-[120px] lg:pt-[120px] bg-richblack-900 overflow-x-hidden'>
        <div className={`${isSidebarOpen ? 'z-[10000]' : ''}`}><Slider isOpen={isSidebarOpen}/></div>
        <div className='h-screen'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>

        <button
        className='z-10 lg:hidden fixed top-[100px] left-[25px] bg-cyan text-white rounded-full shadow-md'
        onClick={handleSidebarToggle}
      >
        {isSidebarOpen ? <AiOutlineDoubleLeft /> : <AiOutlineDoubleRight />}
      </button>
      
    </div>
  )
}

export default DashBoard