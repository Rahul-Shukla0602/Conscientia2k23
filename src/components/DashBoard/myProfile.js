import React from 'react';
import { useSelector } from 'react-redux';
import IconBtn from '../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { RiEditBoxLine } from 'react-icons/ri';
import { formattedDate } from '../../utils/dataFormatter';

const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  if (!user) {
    return (
      <div>
        use null hai
      </div>
    );
  }

  return (
    <div className="mt-8 w-screen px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 h-screen transform translate-x-[-240px] lg:translate-x-[200px]">
      <h1 className="transform translate-y-[-40px] text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:p-8 lg:w-[792px]">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold text-richblack-5">{user?.firstName + ' ' + user?.lastName}</p>
          <p className="text-sm text-richblack-300">{user?.email}</p>
        </div>
        <IconBtn text="Edit" onclick={() => { navigate('/dashboard/settings') }}>
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:p-8 lg:w-[792px]">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn text="Edit" onclick={() => { navigate('/dashboard/settings') }}>
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className={`${
          user?.additionalDetails?.about
            ? 'text-richblack-5'
            : 'text-richblack-400'
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? 'Write Something about Yourself'}
        </p>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:p-8 lg:w-[792px]">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <IconBtn text="Edit" onclick={() => { navigate('/dashboard/settings') }}>
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm text-richblack-600">First Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.firstName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.lastName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Email</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.email}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.contactNumber ?? 'Add Contact Number'}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Gender</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender ?? 'Add Gender'}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5">
              {formattedDate(user?.additionalDetails?.dateOfBirth) ?? 'Add Date Of Birth'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
