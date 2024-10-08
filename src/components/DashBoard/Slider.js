import React, { useState,useRef } from 'react';
// import {AiOutlineDoubleLeft} from 'react-icons/ai'
// import {AiOutlineDoubleRight} from 'react-icons/ai'
import { sidebarLinks } from '../../data/dashboard-links';
import { logout } from '../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink.js';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../common/ConfirmationModal';
// import { useOnClickOutside } from '../../hooks/useOnClickOutside'

const Slider = ({isOpen}) => {
  // const [Open,setOpen] = useState(false);
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myref = useRef();
  // useOnClickOutside(myref,()=>{setOpen(false)});
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  // const [side, setSide] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin' role='status'></div>
        <span className='ml-4'>Loading...</span>
      </div>
    );
  }

  // Function to handle sidebar toggle for smaller screens
  // const handleSidebarToggle = () => {
  //   setSide(!side);
  // };

  return (
    <div>
      <div
      ref={myref}
      onClick={(e)=>e.stopPropagation()}
        className={`flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 lg:bg-richblack-800 py-10 ${
          isOpen ? 'translate-x-0 bg-none bg-richblack-800 z-100' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 h-screen`}
      >
        <div className='flex flex-col'>
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return <SidebarLink key={link.id} link={link} iconName={link.icon}/>;
          })}
        </div>
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
        <div className='flex flex-col gap-y-4'>
          <SidebarLink link={{ name: 'Settings', path: 'dashboard/settings' }} iconName='VscSettingsGear' />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: 'Are You Sure ?',
                text2: 'You will be logged out of your Account',
                btn1Text: 'Logout',
                btn2Text: 'Cancel',
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className='text-sm font-medium text-richblack-300'
          >
            <div className='flex items-center lg:ml-[30px] gap-x-2'>
              <VscSignOut className='text-lg' />
              <span
              // onClick={() => setOpen(false)}
              >Logout</span>
            </div>
          </button>
        </div>
      </div>
      {/* Button to toggle sidebar for smaller screens */}
      {/* <button
        className='z-10 lg:hidden absolute top-[10px] left-[25px]  bg-cyan text-white rounded-full shadow-md '
        onClick={handleSidebarToggle}
      >
        {side ? <AiOutlineDoubleLeft/> : <AiOutlineDoubleRight/>}
      </button> */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Slider;
