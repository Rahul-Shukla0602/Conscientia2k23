import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../assets/image/scienceWorkshop.png';
import { AiOutlineLink } from 'react-icons/ai';

const TestingSchool = () => {
  return (
    <div className='mx-[20px] transform translate-y-[150px]  lg:w-[550px] lg:mx-auto lg:p-[24px] text-richblack-25 flex flex-col lg:gap-5 bg-richblack-800 lg:h-[600px] rounded-2xl'>
      <img
        src={Image}
        alt=''
        className='w-full lg:w-[576px] h-auto rounded-xl'
      />
      <div className='flex flex-col gap-3 text-richblack-100 p-4 lg:p-0'>
        <p>MINDSPARK</p>
        <p>
          We are pleased to introduce the science exhibition, “MINDSPARK”
          organized by our institute as part of its tech fest Conscientia.
          <p className=' hidden lg:block'>
          This
          event aims to celebrate the wonders of science and provide a platform
          for students to showcase their innovative ideas, experiments, and
          projects.
          </p>
        </p>
        <div className='flex items-center justify-around mt-5'>
          <a
            href='https://drive.google.com/file/d/1u_XUDuncK3X0TMJBxupw3dTOsaxDoZul/view?usp=sharing'
            target='_blank'
            rel='noopener noreferrer'
            className='flex justify-center items-center text-pink-100'
          >
            <AiOutlineLink />
            <span>BROCHURE</span>
          </a>
          <a
            href='https://res.cloudinary.com/dwdwnfcnx/image/upload/v1689795885/Conscientiateam/Science_Exhibition_jk208n.png'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-yellow-200 text-black font-semibold px-2 lg:px-4 py-2 rounded-lg'
          >
            Details
          </a>
          <a
            href='https://docs.google.com/forms/d/e/1FAIpQLSfhAaf1NgZoIRLvdgTPBYraURzEyX4fnFwER0FJ4TMzQuLX1g/viewform'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-yellow-200 text-black font-semibold px-2 lg:px-4 py-2 rounded-lg'
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestingSchool;
