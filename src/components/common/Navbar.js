import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import logo from '../../assets/image/logo.png';
import { NavbarLinks } from '../../data/Navbar-links';
import { useSelector } from 'react-redux';
import ProfileDropDown from '../Auth/ProfileDropDown';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
// w-full max-w-[1160px]
  return (
    <div className='flex items-center justify-center w-full py-2 absolute z-50'>
      <div className='flex items-center'>
        <Link to='/' className='mr-4'>
          <img src={logo} alt='logo' width={80} height={32} />
        </Link>

        <nav>
          <ul className='flex items-center space-x-6 pl-20'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link?.path}>
                  <p
                    className={`${
                      matchRoute(link?.path) ? 'text-yellow-50' : 'text-richblack-50'
                    } text-lg font-normal`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex items-center space-x-4 ml-auto pl-32'>
          {!token && (
            <Link
              to='/login'
              className='text-richblack-100 border border-richblack-500 rounded-md px-4 py-2 bg-richblack-700'
            >
              Login
            </Link>
          )}
          {!token && (
            <Link
              to='/signup'
              className='text-richblack-100 border border-richblack-500 rounded-md px-4 py-2 bg-richblack-700'
            >
              Sign Up
            </Link>
          )}
          {token && (
            <Link className='text-richblack-500'>
              <ProfileDropDown />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
