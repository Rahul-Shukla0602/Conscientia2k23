import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import frameImg from '../../assets/image/frame.png';

const Template = ({ title, description1, description2, image, formType }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="font-inter pt-20">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center lg:flex-row gap-x-[140px]">
          <div className="mx-auto mt-[92px] w-[330px] lg:w-[508px] h-[804px] max-w-[440px] md:mx-0 flex flex-col gap-y-[13px]">
            <h1 className="text-richblack-5 text-3xl font-semibold leading-9">{title}</h1>
            <p className="w-[330px] lg:w-[460px] lg:h-[50px]">
              <span className="text-richblack-100 font-normal text-lg leading-6">{description1}</span>{' '}
              <span className="font-edu-sa text-blue-100 font-italic text-lg leading-6">{description2}</span>
            </p>
            {formType === 'signup' ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="lg:w-[558px] h-[504px]">
            <img src={frameImg} alt="" className="hidden lg:block  transform -translate-y-[50px]" />

            <img src={image} alt="" className="hidden lg:block transform -translate-y-[640px] -translate-x-[25px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
