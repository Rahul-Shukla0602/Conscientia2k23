import React from 'react'
import { Merchs } from '../data/merchs'
import './Merchandise.css'
import { AiOutlineLink } from 'react-icons/ai';
import {FaShoppingCart} from 'react-icons/fa'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom'
// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addtocart } from '../slices/cartSlice'

export default function Merchandise() {
  // const [Open,setOpen] = useState(false);
  const dispatch = useDispatch();
  const cartitems = useSelector((state)=> state.cart)

  return (
    <div>
      <section className="z-40 relative bg-slate-900 text-base text-white font-light pt-32">
        <span className='block w-full text-center font-bold text-4xl'>MERCHANDISE</span>
        <button id='merchfab'>
        <Link className='flex items-center justify-center flex-col'
                // onClick={() => setOpen(false)}
                to='/cart'
                >
                  <span className='absolute -mt-[24px]'>{cartitems.items.length}</span>
                  <FaShoppingCart id='fabcart' name='cart' type='solid' color='#ffffff' class='mt-[15px]'></FaShoppingCart>
        </Link>
        </button>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">

            {
              Merchs.map((val,i)=>{
                return(
                  <div className="lg:w-4/5 mx-auto mb-4 flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center
                    rounded" src={val.img} loading='lazy'/>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">{val.brand}</h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{val.title}</h1>
                    <p className="leading-relaxed">{val.desc}</p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    <div className="flex"><span className="mr-3 whitespace-nowrap text-sm lg:text-base ">Color: {val.color}</span></div>
                    <div className="flex ml-6 items-center text-base">
                    <span className="mr-3">Size</span>
                    <div className="text-black relative">
                        <select id={val.id} className="font-medium rounded border appearance-none border-gray-300
                        py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        {val.size.map((v,n)=>{
                            return(
                            <option value={v}>{v}</option>
                            )
                        })}
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none
                        flex items-center justify-center">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </div>
                      <Link className='pl-[20px] whitespace-nowrap flex flex-row-reverse items-center gap-[8px] text-pink-100' 
                        to='https://res.cloudinary.com/dwdwnfcnx/image/upload/v1693058272/size_cart_budgj1.jpg'
                        target='_blank'>Size Guide
                        <AiOutlineLink/>
                      </Link>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">₹{val.rate}</span>
                        <button id={`btn_${val.id}`} className="flex ml-auto text-white border-0 py-2 px-6
                        focus:outline-none hover:bg-blue-600 rounded bg-blue-100" onClick={()=>{
                        let sizeopt = document.getElementById(val.id)
                        dispatch(addtocart({
                            ...val,
                            size: sizeopt.value,
                            qty: 1
                        }))
                        }}>Add to Cart</button>
                    {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button> */}
                  </div>
                </div>
            </div>
                )
              })
            }
          </div>
        </section>
        <Footer />
      </section>
    </div>
  )
}
