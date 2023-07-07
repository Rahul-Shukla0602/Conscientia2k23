import React from 'react';
import merch1 from '../../../assets/merchImage/merch.png';

const Merchandise = () => {
  return (
    <div className="bg-black flex flex-col items-center lg:gap-24 px-4 lg:px-0">
      <h1
        style={{
          background: 'linear-gradient(117.95deg, #833AB4 -2.4%, #FD1D1D 52.25%, #FCB045 106.89%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textFillColor: 'transparent',
        }}
        className="text-4xl lg:text-6xl font-semibold text-center mt-8 lg:mt-0"
      >
        MERCHANDISE
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-40 my-8">
        <img src={merch1} alt="first" className="w-[300px] h-[400px]" />
        <div className="lg:w-[686px] text-richblack-100 flex flex-col gap-5 text-center lg:text-left">
          <p className=' text-start'>
            Introducing the must-have addition to your wardrobe - the official Conscientia merchandise T-shirt! This
            stylish and comfortable piece is made with high-quality materials, ensuring durability and maximum comfort.
            But what really sets this shirt apart are its reflective prints that are sure to turn heads wherever you go.
          </p>
          <p className=' hidden sm:block'>
            Whether you're a die-hard fan of Conscientia or simply looking for a trendy new item to add to your
            collection, this T-shirt is an absolute must-have. It's not just a fashion statement - it's a symbol of your
            connection to a community of like-minded individuals who share your passion for all things tech.
          </p>
          <p className=' hidden sm:block'>
            So why settle for ordinary when you can stand out from the crowd with our exclusive Conscientia T-shirt?
            Join the techfest movement today and show your support for this iconic brand by upgrading your wardrobe with
            our official merchandise. Don't miss out on this unique opportunity to make a statement and connect with
            fellow tech enthusiasts - order yours now!
          </p>
          <div>
            <button className="bg-yellow-300 text-black font-semibold px-4 lg:px-9 py-2 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
