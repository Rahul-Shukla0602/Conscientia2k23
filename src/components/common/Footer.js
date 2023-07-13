import React from 'react';
import { FooterLinks } from '../../data/footer-links';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Mailto } from './Mailto';
import logo from '../../assets/image/logo.png';

const Footer = () => {
  return (
    <div className="w-screen bg-richblack-800 text-white py-10 text-lg hover:">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center lg:gap-[360px] px-4">

        <div className="flex items-center">
          <img src={logo} alt="" className="w-24" />
          <div className="ml-4 md:ml-8 hidden sm:block">
            <div className="grid grid-cols-2 mt-2 gap-4">
              {FooterLinks.map((ele) => (
                <Link
                  key={ele.id}
                  to={ele.path}
                  className="text-gray-300 mr-4  hover:text-yellow-200"
                >
                  {ele.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-0">
          <p className="text-lg font-semibold">Follow Us!</p>
          <div className="flex mt-2 ">
            <Link to="" className="text-gray-300 hover:text-yellow-200 mr-4">
              <FaFacebook />
            </Link>
            <Link to="" className="text-gray-300 hover:text-yellow-200 mr-4">
              <FaLinkedin />
            </Link>
            <Link to="" className="text-gray-300 hover:text-yellow-200 mr-4">
              <FaInstagram />
            </Link>
            <Link to="" className="text-gray-300 hover:text-yellow-200">
              <FaYoutube />
            </Link>
          </div>
          <div className="flex flex-col mt-4">
            <p className="text-lg font-semibold">For any queries, contact us at:</p>
            <Mailto email="conscientiateamiist@gmail.com" className="text-gray-300 hover:text-white" />
          </div>
        </div>

      </div>

      <p className="text-center text-gray-300 mt-8">
        © Conscientia2023, Indian Institute Of Space Science And Technology, Thiruvananthapuram, Kerala - 695547
      </p>

    </div>
  );
};

export default Footer;
