import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import Slider from '../components/DashBoard/Slider'
// import { Outlet } from 'react-router-dom';
const DashBoard = () => {
    // const {loading:authLoading } = useSelector((state)=>state.auth);
    // const {loading:profileLoading } = useSelector((state)=>state.profile);
    // const [side,setsidebar] = useState(false);

    // if(profileLoading || authLoading ){
    //     return (
    //         <div className='w-full h-full flex justify-center items-center'>
    //             <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200
    //             animate-spin' role='status'>
    //             </div>
    //             <span className='ml-4'>Loading...</span>
    //         </div>
    //     );
    // }
  return (
    <div className='flex h-screen pt-[120px] lg:pt-[120px] bg-richblack-900 overflow-x-hidden overflow-y-auto'>
        {/* <Slider/>
        <div className='h-screen'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div> */}
      
    </div>
  )
}

export default DashBoard