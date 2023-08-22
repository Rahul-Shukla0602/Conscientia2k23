import React, {useRef, useState } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import logo from '../../assets/image/logo.png';
import { NavbarLinks } from '../../data/Navbar-links';
import { useSelector } from 'react-redux';
import ProfileDropDown from '../Auth/ProfileDropDown';
import { FaBars, FaTimes } from "react-icons/fa";
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import './Navbar.css'

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [Open,setOpen] = useState(false);
  const myref = useRef();
  useOnClickOutside(myref,()=>{setOpen(false)});
  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
    setOpen(!Open);
  };
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className=' flex items-center justify-center w-full lg:py-5 absolute lg:-ml-32 mt-[30px] lg:mt-[1px]'>

      <div className='flex lg:flex-row items-center gap-[160px] lg:gap-10 '>

        <Link 
        onClick={() => setOpen(false)}
        to='/' className='mr-4'>
          <img src={logo} alt='logo'
            className=' w-16 lg:w-24 h-15 lg:h-20  transform translate-x-[15px] lg:-translate-x-[70px]'
          />
        </Link>


        <div className='flex items-center justify-center gap-4'>

        <div className='lg:hidden flex items-center space-x-4 ml-auto lg:pl-[800px]'>
          {token  && (
            <Link 
            onClick={() => setOpen(false)}
            className='text-richblack-500'
            >
              <ProfileDropDown />
            </Link>
          )}
        </div>      
        <button
          className='flex items-center justify-center gap-4 md:hidden transform text-gray-700 rounded-md focus:border-gray-400 focus:border outline-none'
          onClick={toggleNavbar}
        >
          {navbarOpen ? (
            <FaTimes className='w-6 h-6 text-white' />
          ) : (
            <FaBars className='w-6 h-6 text-white' />
          )}
        </button>

        </div>

        <nav 
        ref={myref}
        onClick={(e)=>e.stopPropagation()}
        className={`md:flex lg:flex-row flex-col md:items-center
        ${navbarOpen && Open ? 'w-[200px] h-[250px] px-5 text-end absolute block transform translate-x-[100px] translate-y-[170px] bg-transparent backdrop-blur-2xl' : 'hidden'}`}>
          <ul className='z-50 md:flex md:items-center space-x-6 md:space-x-10'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link 
                onClick={() => setOpen(false)}
                to={link?.path}>
                  <p
                    className={`
                    ${matchRoute(link?.path) ? 'text-yellow-50' : 'text-richblack-50'}
                    text-lg font-normal`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className='flex flex-col lg:flex-row items-center space-x-4 gap-2  lg:pl-[700px] absolute'>
          {!token && (
            <Link
            onClick={() => setOpen(false)}
            to='/login'
            className={`${navbarOpen?' transform translate-x-[80px] text-richblack-100 border border-richblack-500 rounded-md px-2 py-1 bg-richblack-700':'lg:block text-richblack-100 border border-richblack-500 rounded-md px-4 py-2 bg-richblack-700'}`}
            >
              Login
            </Link>
          )}
          {!token && (
            <Link
            onClick={() => setOpen(false)}
            to='/signup'
            className={`${navbarOpen?'transform translate-x-[65px] text-richblack-100 border border-richblack-500 rounded-md px-2 py-1  bg-richblack-700':'lg:block text-richblack-100 border border-richblack-500 rounded-md px-4 py-2 bg-richblack-700'}`}
            >
              Sign Up
            </Link>
          )}
          {token  && (
            <Link 
            className=' hidden transform translate-x-[150px] lg:block text-richblack-500'
            >
              <ProfileDropDown />
            </Link>
          )}
          </div>   

       </nav>

      </div>
    </div>
  );
};

export default Navbar;

